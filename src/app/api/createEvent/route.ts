import { NextResponse } from "next/server";

// Temporary definition for MVP build.
export async function POST() {
  return NextResponse.json({ message: "Event created" });
}
