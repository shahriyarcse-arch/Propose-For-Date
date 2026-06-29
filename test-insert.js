import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
  console.log("Inserting response with valid date...");
  const newResponse = {
    name: 'Test Name',
    location: 'Test Location',
    food: 'Test Food',
    date: '2026-06-30', // Valid date
    time: 'Test Time',
    timestamp: new Date().toISOString(),
  };

  const { data: inserted, error } = await supabase
    .from('responses')
    .insert([newResponse])
    .select();

  if (error) {
    console.error("Insert Error:", error);
  } else {
    console.log("Inserted Data:", inserted);
  }
}

testInsert();
