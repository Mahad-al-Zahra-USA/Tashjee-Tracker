import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export async function POST(req: NextRequest) {
  const {
    event_name,
    student_first_name,
    student_last_name,
    house_id, // Optional, will be fetched from the student record if not provided
    event_details, // Update to use the correct column name 'event_details'
  } = await req.json(); // Parse JSON body from the request

  try {
    // 1. Get the event_id and use it for event_types_id from the event_name if not provided
    let event_types_id_to_use: string | undefined = undefined;

    if (event_name) {
      const { data: eventData, error: eventError } = await supabase
        .from('events') // Assuming there's an 'events' table with name and id
        .select('id')
        .eq('name', event_name) // Find event by name
        .single();

      if (eventError || !eventData) {
        console.error("Event error:", eventError);  // Log the specific error
        return NextResponse.json({ error: 'Event not found' }, { status: 400 });
      }

      event_types_id_to_use = eventData.id; // Set event_types_id to the event ID (this is the event_types_id value)
    } else {
      return NextResponse.json({ error: 'Event name is required' }, { status: 400 });
    }

    // 2. Get the student_id and house_id based on first_name and last_name
    if (!student_first_name || !student_last_name) {
      return NextResponse.json({ error: 'First and Last Name are required for student lookup' }, { status: 400 });
    }

    const { data: studentData, error: studentError } = await supabase
      .from('students') // Assuming the 'students' table has first_name, last_name, student_id, and house_id
      .select('id, house_id')
      .eq('first_name', student_first_name)
      .eq('last_name', student_last_name)
      .single();

    if (studentError || !studentData) {
      console.error("Student error:", studentError);  // Log the specific error
      return NextResponse.json({ error: 'Student not found' }, { status: 400 });
    }

    const student_id = studentData.id;
    const student_house_id = studentData.house_id;

    // If house_id was not provided in the request, use the house_id from the student's data
    const house_id_to_use = house_id || student_house_id;

    // 3. Insert the row into the event_log table with event_id set to null
    const { data, error } = await supabase
      .from('event_log')
      .insert([
        {
          event_id: null,  // Always set event_id to null
          event_types_id: event_types_id_to_use,  // Use the correct column name 'event_types_id'
          student_id,
          house_id: house_id_to_use,
          event_details: event_details || null,  // Use event_details as the column name
          created_at: new Date(), // Use the current time as created_at
          updated_at: null, // Optionally include updated_at if it is part of the form
        },
      ]);

    if (error) {
      console.error("Insertion error:", error);  // Log the specific error
      return NextResponse.json({ error: 'Failed to log event', details: error.message }, { status: 500 });
    }

    // Return success response
    return NextResponse.json({ message: 'Event logged successfully', data }, { status: 201 });

  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

