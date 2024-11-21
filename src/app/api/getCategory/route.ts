import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// Handle the GET request to fetch distinct categories from the 'events' table
export async function GET(req: NextRequest) {
  try {
    // Fetch distinct categories from the 'events' table where 'category' is not null
    const { data, error } = await supabase
      .from("events") // Querying the 'events' table
      .select("category") // Select the 'category' column
      .not("category", "is", null) // Filter for non-null 'category' values
      .order("category", { ascending: true }) // Sort categories alphabetically

    if (error) throw error;

    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, error: "No categories found" },
        { status: 404 }
      );
    }

    // Extract distinct categories
    const categories = Array.from(new Set(data.map((item) => item.category)));

    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    console.error("Error fetching categories data:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

