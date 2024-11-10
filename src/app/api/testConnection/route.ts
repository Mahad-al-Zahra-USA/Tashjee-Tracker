import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// Handle the GET request
export async function GET(req: NextRequest) {
  try {
    // Attempt to fetch data from 'test_table'
    const { data, error } = await supabase.from("test_table").select("*").limit(1);

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Connection test failed:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
