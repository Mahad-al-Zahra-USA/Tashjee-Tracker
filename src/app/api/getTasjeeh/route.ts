import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// Handle the GET request to fetch students with positive points
export async function GET(req: NextRequest) {
  try {
    // Attempt to fetch the students with positive points from the 'students' table
    const { data, error } = await supabase
      .from("students")
      .select("id, name, points") // Select relevant fields (id, name, points)
      .gt("points", 0); // Filter for positive points (greater than 0)

    if (error) throw error;

    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, error: "No students with positive points found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error fetching positive points data:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
