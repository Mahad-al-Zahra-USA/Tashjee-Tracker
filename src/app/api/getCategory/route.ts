import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// Handle the GET request to fetch distinct categories from the 'events' table
export async function GET() {
  try {
    const { data, error } = await supabase.rpc("get_enum_values", {
      enum_name: "event_category",
    }); //get_enum_values is an RPC function stored in the database.

    if (error) throw error;

    if (!data || data.length === 0) {
      return NextResponse.json({ success: false, error: "No categories found" }, { status: 404 });
    }

    // console.log("Categories data:", data);

    return NextResponse.json({ success: true, data: data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories data:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
