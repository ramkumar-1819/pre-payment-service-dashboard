import { NextResponse } from "next/server";
import { FilterSchema } from "@/app/utils/schema";
const connection = require("../../../connection");

export async function POST(req) {
  let payload = await req.json();
  const { serviceId, serviceName } = payload;
  let searchQuery = {
    bool: {
      must: [
        {
          term: { docType: "services" },
        },
        {
          exists: {
            field: "data.serviceId",
          },
        },
      ],
    },
  };

  if (serviceId) {
    searchQuery = {
      term: {
        "data.serviceId.keyword": payload["serviceId"],
      },
    };
  } else if (serviceName) {
    searchQuery = {
      match: {
        "data.serviceName": payload["serviceName"],
      },
    };
  }

  try {
    const query = {
      index: process.env.CORE_INDEX,
      body: {
        _source: {},
        query: searchQuery,
        track_total_hits: true,
        sort: [{ createdOn: { order: "desc" } }],
      },
    };
    let doc = await connection.es.fetch(query, process.env.CORE_INDEX);
    doc = doc.map((items) => items?.data);
    return NextResponse.json({ doc }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.toString() }, { status: 400 });
  }
}
