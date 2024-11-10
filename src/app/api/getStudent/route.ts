import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// Handle the GET request to fetch a specific student by ID
export async function GET(req: NextRequest) {
  try {
    // Extract the 'id' query parameter from the request
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("id");

    if (!studentId) {
      return NextResponse.json(
        { success: false, error: "Student ID is required" },
        { status: 400 }
      );
    }

    // Attempt to fetch the student data from the 'students' table
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("id", studentId)
      .single(); // .single() ensures only one row is returned

    if (error) throw error;

    if (!data) {
      return NextResponse.json(
        { success: false, error: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error fetching student data:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
