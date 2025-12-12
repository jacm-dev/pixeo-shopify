import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

// These should be environment variables
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
