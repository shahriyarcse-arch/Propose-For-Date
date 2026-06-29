import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase database.
// We fallback to local storage if they are not provided, ensuring zero-setup out of the box.
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

const LOCAL_STORAGE_KEY = 'date_proposal_responses';

export const db = {
  // Save a new response
  async saveResponse(data) {
    const newResponse = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    if (supabase) {
      try {
        const { data: inserted, error } = await supabase
          .from('responses')
          .insert([newResponse])
          .select();
        
        if (error) throw error;
        if (inserted && inserted.length > 0) {
          return inserted[0];
        }
      } catch (error) {
        console.warn('Supabase insert failed. Saving to local storage instead:', error);
      }
    }

    // Fallback to local storage
    const localData = this.getLocalResponses();
    const item = { ...newResponse, id: Date.now().toString() };
    localData.push(item);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localData));
    return item;
  },

  // Get all responses
  async getResponses() {
    if (supabase) {
      try {
        const { data: fetched, error } = await supabase
          .from('responses')
          .select('*')
          .order('timestamp', { ascending: false });

        if (error) throw error;
        if (fetched) return fetched;
      } catch (error) {
        console.warn('Supabase fetch failed. Loading local responses instead:', error);
      }
    }

    // Fallback to local storage
    return this.getLocalResponses().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  // Helper: Get local storage responses
  getLocalResponses() {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Clear a response by ID
  async deleteResponse(id) {
    if (supabase) {
      try {
        // If it's a numeric timestamp ID, it was created locally. Skip Supabase deletion for it.
        const isLocalOnly = !isNaN(id) && id.length < 15;
        if (!isLocalOnly) {
          const { error } = await supabase
            .from('responses')
            .delete()
            .eq('id', id);
          if (error) throw error;
        }
      } catch (error) {
        console.warn('Supabase delete failed. Deleting locally:', error);
      }
    }

    // Fallback/Local storage delete
    const localData = this.getLocalResponses();
    const updatedLocal = localData.filter(item => item.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLocal));
    return true;
  }
};
