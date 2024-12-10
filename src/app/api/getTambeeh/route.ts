import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export async function GET() {
  try {
    // Fetch tambeeh data from the 'events' table where points is negative
    const { data, error } = await supabase
      .from("events")
      .select("name") // Correct way to select multiple columns
      .lt("points", 0);

    // Handle errors from the query
    if (error) {
      console.error("Error fetching Tambeeh:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // If no data is found, return a 404 response
    if (!data || data.length === 0) {
      return NextResponse.json({ success: false, error: "No Tambeeh found" }, { status: 404 });
    }

    // Return the data successfully
    return NextResponse.json({ success: true, data: data }, { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    // Handle unexpected errors
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
