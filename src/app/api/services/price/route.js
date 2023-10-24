import { NextResponse } from "next/server";
import { PriceSchema } from "@/app/utils/schema";
const connection = require("../../../connection");

const priceUpdateQuery = (data) => {
  const { name, serviceId } = data;
  const updateScript = {
    source: `ctx._source.data.price.${name} = params.price`,
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

export async function POST(req) {
  const payload = await req.json();
  const { error } = PriceSchema.validate(payload);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  try {
    const query = priceUpdateQuery(payload)
    await connection.es.updateByQuery(
      query,
      process.env.CORE_INDEX
    );
    return NextResponse.json(
      { msg: "Service price created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.toString() }, { status: 400 });
  }
}

