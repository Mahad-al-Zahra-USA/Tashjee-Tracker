import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// Handle GET request to fetch events by category (where category is now a string)
export async function GET(req: NextRequest) {
  try {
    // Get the category from the query parameters (e.g., /api/events?category=tahfeez)
    const categoryParam = req.nextUrl.searchParams.get("category");

    if (!categoryParam) {
      return NextResponse.json(
        { success: false, error: "Category parameter is required" },
        { status: 400 }
      );
    }

    // List of valid categories (the predefined string values)
    const validCategories = ['tahfeez', 'academic', 'personal'];

    // Validate if the provided category is valid
    if (!validCategories.includes(categoryParam.toLowerCase())) {
      return NextResponse.json(
        { success: false, error: `Invalid category value. It must be one of: ${validCategories.join(', ')}` },
        { status: 400 }
      );
    }

    // Ensure category is lowercase (optional, for consistency)
    const category = categoryParam.toLowerCase();

    // Query the 'events' table for events with the specified category
    const { data, error } = await supabase
      .from("events")
      .select("*") // Select all columns (or specify which ones you need)
      .eq("category", category); // Filter events by the provided category (as a string)

    // Handle errors from the query
    if (error) {
      console.error("Error fetching events by category:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    // If no data is found, return a 404 response
    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, error: `No events found for category: ${category}` },
        { status: 404 }
      );
    }

    // Return the data successfully
    return NextResponse.json(
      { success: true, data: data },
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

