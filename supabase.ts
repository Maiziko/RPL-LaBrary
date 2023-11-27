import { SupabaseClient, createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Gantilah dengan URL proyek Anda
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Gantilah dengan kunci anonim proyek Anda
const supabase: SupabaseClient | null = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export { supabase };