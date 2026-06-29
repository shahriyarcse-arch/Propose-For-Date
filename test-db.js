import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testDb() {
  console.log("Fetching responses...");
  const { data: fetched, error: fetchError } = await supabase
    .from('responses')
    .select('*')
    .order('timestamp', { ascending: false });

  if (fetchError) {
    console.error("Fetch Error:", fetchError);
  } else {
    console.log("Fetched Responses:", fetched);
  }
}

testDb();
