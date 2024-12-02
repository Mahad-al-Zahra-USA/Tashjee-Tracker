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
    // Get the category from the query parameters (e.g., /api/event_types?category=Tahfeez)
    const categoryParam = req.nextUrl.searchParams.get("category");

    let query = supabase.from("event_types").select("id, name, description, points, send_email");

    if (categoryParam) {
      // Fetch valid categories from the database
      const validCategories = await fetch("http://localhost:3000/api/getCategory")
        .then((res) => res.json())
        .then((data) => data.data);

      // Validate the provided category value
      if (!validCategories.includes(categoryParam)) {
        return NextResponse.json(
          { success: false, error: `Invalid category value. It must be one of: ${validCategories.join(", ")}` },
          { status: 400 }
        );
      }
      query = query.eq("category", categoryParam);
    }
    const { data, error } = await query;

    // Handle errors from the query
    if (error) {
      console.error("Error fetching events by category:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // If no data is found, return a 404 response
    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, error: `No events found ${categoryParam ? "for category: " + categoryParam : ""}` },
        { status: 404 }
      );
    }

    // Return the data successfully
    return NextResponse.json({ success: true, data: data }, { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
