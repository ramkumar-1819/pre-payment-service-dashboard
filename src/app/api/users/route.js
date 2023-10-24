import { NextResponse } from "next/server";
const connection = require('../../connection');
const bcrypt = require('bcrypt');

const existingUserCheck = async (email) => {
  const query = {
    index: process.env.CORE_INDEX,
    body: {
      _source: {},
      query: {
        term: { 'email.keyword': email },
      },
      sort: [{ createdOn: { order: 'desc' } }],
      size: 1,
    },
  };
  const doc = await connection.es.fetch(query);
  if (doc && doc[0]) {
    const data = doc[0];
    return data;
  }
  return null
}

export async function POST(req) {
  const payload = await req.json();
  try {
    const { email, password } = payload;
    const doc = await existingUserCheck(email);
    if (doc) {
      return NextResponse.json({ error: 'User already exist' },{ status: 409 });
    } else {
      const data =  { ...payload, docType: 'users' };
      data['password'] = bcrypt.hashSync(password, 10);
      await connection.es.create(
        process.env.CORE_INDEX,
        data,
      );
      return NextResponse.json({ msg: 'User created successfully' },{ status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error },{ status: 400 });
  }
}
