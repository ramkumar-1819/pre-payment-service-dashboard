import { NextResponse } from "next/server";
import { headers } from "next/headers";
const jwt = require("jsonwebtoken");

export async function GET() {
  const headersList = headers();
  const token = headersList.get("pay-token");
  try {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      return NextResponse.json({ msg: "Valid User" }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 409 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
