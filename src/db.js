import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
  }
}

export const db = {
  // Save a new response directly to Supabase
  async saveResponse(data) {
    if (!supabase) {
      throw new Error('Supabase is not configured. Please check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
    }

    const newResponse = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    const { data: inserted, error } = await supabase
      .from('responses')
      .insert([newResponse])
      .select();
    
    if (error) throw error;
    if (inserted && inserted.length > 0) {
      return inserted[0];
    }
    return newResponse;
  },

  // Get all responses directly from Supabase
  async getResponses() {
    if (!supabase) {
      return [];
    }

    const { data: fetched, error } = await supabase
      .from('responses')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return fetched || [];
  },

  // Clear a response by ID directly from Supabase
  async deleteResponse(id) {
    if (!supabase) return false;

    const { error } = await supabase
      .from('responses')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
};
