import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Gantilah dengan URL proyek Anda
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Gantilah dengan kunci anonim proyek Anda
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

if (!supabase) {
    console.error("supabaseUrl dan supabaseKey tidak didefinisikan.");
  }

export { supabase };