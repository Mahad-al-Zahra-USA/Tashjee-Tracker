import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// Handle POST request to create an event
export async function POST(req: NextRequest) {
  try {
    // Parse the request body (JSON)
    const { event_id, event_type, student_id, house_id, created_at, updated_at, event_details } = await req.json();

    // Validate required fields
    if (!event_id || !event_type || !student_id || !created_at) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: event_id, event_type, student_id, or created_at." },
        { status: 400 }
      );
    }

    // Validate that student_id is a valid UUID (optional but recommended)
    if (!isValidUUID(student_id)) {
      return NextResponse.json(
        { success: false, error: "Invalid student_id. It must be a valid UUID." },
        { status: 400 }
      );
    }

    // Validate created_at timestamp format (ISO 8601)
    if (isNaN(new Date(created_at).getTime())) {
      return NextResponse.json(
        { success: false, error: "Invalid created_at timestamp format." },
        { status: 400 }
      );
    }

    // If updated_at is not provided, set it to the current timestamp
    const updatedAt = updated_at || new Date().toISOString();

    // Insert the new event into the 'event_log' table with the new column order
    const { data, error } = await supabase
      .from("event_log")
      .insert([
        {
          event_id: event_id,            // int4
          event_type: event_type,        // int8
          student_id: student_id,        // uuid
          house_id: house_id || null,    // int2 (optional, defaults to null if not provided)
          created_at: created_at,        // timestamp
          updated_at: updatedAt,         // timestamp (optional)
          event_details: event_details || null  // text (optional)
        }
      ])
      .single();  // .single() ensures we return only one row

    // Handle errors from the insertion
    if (error) {
      console.error("Error inserting event:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    // Return the inserted event as a success response
    return NextResponse.json(
      { success: true, data: data },
      { status: 201 }  // 201 Created
    );
    
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to validate if a string is a valid UUID
function isValidUUID(uuid: string): boolean {
  const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return regex.test(uuid);
}

