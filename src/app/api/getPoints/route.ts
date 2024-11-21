// import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";

// // Initialize the Supabase client
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL || "",
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
// );

// // Handle GET request to fetch points for a given event name
// export async function GET(req: NextRequest) {
//   try {
//     // Get the event name from the query parameters (e.g., /api/events/points?name=EventName)
//     const eventName = req.nextUrl.searchParams.get("name");

//     // If no event name is provided, return a 400 error
//     if (!eventName) {
//       return NextResponse.json(
//         { success: false, error: "Event name parameter is required" },
//         { status: 400 }
//       );
//     }

//     // Query the 'events' table for the event with the specified name and fetch the points column
//     const { data, error } = await supabase
//       .from("events")  // Replace 'events' with your actual table name if it's different
//       .select("name, points") // Select the event_name and event_points columns
//       .eq("name", eventName) // Filter by the provided event name
//       .single(); // Assuming event names are unique, we fetch only a single row

//     // Handle errors from the query
//     if (error) {
//       console.error("Error fetching event points:", error.message);
//       return NextResponse.json(
//         { success: false, error: error.message },
//         { status: 500 }
//       );
//     }

//     // If no event data is found, return a 404 response
//     if (!data) {
//       return NextResponse.json(
//         { success: false, error: `No event found with name: ${eventName}` },
//         { status: 404 }
//       );
//     }

//     // Return the points for the event successfully
//     return NextResponse.json(
//       { success: true, event_name: data.name, points: data.points },
//       { status: 200 }
//     );
    
//   } catch (err) {
//     console.error("Unexpected error:", err);
//     return NextResponse.json(
//       { success: false, error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// Handle GET request to fetch points for a given event name
export async function GET(req: NextRequest) {
  try {
    // Get the event name from the query parameters (e.g., /api/events/points?name=EventName)
    const eventName = req.nextUrl.searchParams.get("name");

    // If no event name is provided, return a 400 error
    if (!eventName) {
      return NextResponse.json(
        { success: false, error: "Event name parameter is required" },
        { status: 400 }
      );
    }

    // Query the 'events' table for the event with the specified name and fetch the points column
    const { data, error } = await supabase
      .from("events")  // Replace 'events' with your actual table name if it's different
      .select("points") // Select only the event_points column
      .eq("name", eventName) // Filter by the provided event name
      .single(); // Assuming event names are unique, we fetch only a single row

    // Handle errors from the query
    if (error) {
      console.error("Error fetching event points:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    // If no event data is found, return a 404 response
    if (!data) {
      return NextResponse.json(
        { success: false, error: `No event found with name: ${eventName}` },
        { status: 404 }
      );
    }

    // Return only the points for the event
    return NextResponse.json(
      { success: true, points: data.points },
      { status: 200 }
    );
    
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

