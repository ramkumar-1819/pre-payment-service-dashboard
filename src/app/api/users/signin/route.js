import { NextResponse } from "next/server";
const connection = require("../../../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userExist = async (email) => {
  const query = {
    index: process.env.CORE_INDEX,
    body: {
      _source: {},
      query: {
        term: { "email.keyword": email },
      },
      sort: [{ createdOn: { order: "desc" } }],
      size: 1,
    },
  };
  const doc = await connection.es.fetch(query);
  if (doc && doc[0]) {
    const data = doc[0];
    return data;
  }
  return null;
};

export async function POST(req) {
  const payload = await req.json();

  try {
    const { email, password } = payload;
    const doc = await userExist(email);
    if (!doc) {
      return NextResponse.json({ error: "User not exist" }, { status: 409 });
    } else {
      const passwordCheck = await bcrypt.compareSync(password, doc["password"]);
      if (passwordCheck) {
        const token = jwt.sign(payload, process.env.SECRET);
        const response = NextResponse.json(
          { msg: "Login Success" },
          { status: 200 }
        )
        // set a cookie
        response.cookies.set({
          name: 'pay-token',
          value: token,
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 1,
          path: '/'
        })
        return response;
      } else {
        return NextResponse.json({ error: 'Invalid Credentials' }, { status: 409 }); 
      }
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
