import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// Handle the GET request
export async function GET() {
  try {
    // Attempt to fetch data from 'test_table'
    const { data, error } = await supabase.from("test_table").select("*").limit(1);

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Connection test failed:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
