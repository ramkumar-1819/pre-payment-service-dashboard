import { NextResponse } from "next/server";
import { CoreSchema } from "@/app/utils/schema";
const connection = require("../../connection");

export async function POST(req) {
  const payload = await req.json();
  const { error } = CoreSchema.validate(payload);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  try {
    const data = { data: payload, docType: "services" };
    await connection.es.create(process.env.CORE_INDEX, data);
    return NextResponse.json(
      { msg: "Service created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

const serviceUpdateQuery = (data) => {
  const { serviceId } = data;
  const updateScript = {
    source: `ctx._source.data = params`,
    params: data,
    lang: "painless",
  };

  const query = {
    index: process.env.CORE_INDEX,
    body: {
      script: updateScript,
      query: {
        bool: {
          must: [
            { term: { docType: "services" } },
            { term: { 'data.serviceId.keyword': serviceId } },
          ],
        },
      },
      sort: [{ createdOn: { order: "desc" } }],
      size: 1,
    },
  };
  return query;
};

export async function PUT(req) {
  const payload = await req.json();
  const { error } = CoreSchema.validate(payload);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  try {
    const query = serviceUpdateQuery(payload)
    const doc = await connection.es.updateByQuery(
      query,
      process.env.CORE_INDEX
    );
    return NextResponse.json(
      { doc },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}