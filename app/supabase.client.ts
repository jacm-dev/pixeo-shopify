import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

declare global {
  interface Window {
    ENV: {
      SUPABASE_URL: string;
      SUPABASE_ANON_KEY: string;
    };
  }
}

// Ensure we are in the browser environment before accessing window
const isBrowser = typeof window !== "undefined";

const supabaseUrl = isBrowser ? window.ENV.SUPABASE_URL : "";
const supabaseKey = isBrowser ? window.ENV.SUPABASE_ANON_KEY : "";

export const supabase = isBrowser
  ? createClient<Database>(supabaseUrl, supabaseKey)
  : null;
