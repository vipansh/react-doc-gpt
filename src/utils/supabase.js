import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServerKey = process.env.SUPABASE_SERVER_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.log({
    K: process.env.NEXT_PUBLIC_SUPABASE_URL,
    L: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    S:process.env.OPENAI_API_KEY
  });
  throw new Error(" Supabase environment variables Missing");
}

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export const getServiceSupabase = () => {
  return createClient(supabaseUrl, supabaseServerKey);
};
