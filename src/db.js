import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase database.
// Falls back to local storage automatically if keys are missing or Supabase is inactive/down.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn('Failed to initialize Supabase client:', error);
  }
}

const LOCAL_STORAGE_KEY = 'date_proposal_responses';
const SUPABASE_TIMEOUT_MS = 3000; // 3 second timeout — if Supabase doesn't respond, use local

// Helper: Race a promise against a timeout
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Supabase request timed out')), ms)
    )
  ]);
}

export const db = {
  // ─── Save a new response ─────────────────────────────────
  async saveResponse(data) {
    const newResponse = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    // Always save to localStorage first (instant, guaranteed backup)
    const localData = this.getLocalResponses();
    const localItem = { ...newResponse, id: Date.now().toString() };
    localData.push(localItem);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localData));

    // Then try Supabase (non-blocking, with timeout)
    if (supabase) {
      try {
        const { data: inserted, error } = await withTimeout(
          supabase.from('responses').insert([newResponse]).select(),
          SUPABASE_TIMEOUT_MS
        );
        if (error) throw error;
        if (inserted && inserted.length > 0) return inserted[0];
      } catch (error) {
        console.warn('Supabase unavailable. Response saved to localStorage:', error.message);
      }
    }

    return localItem;
  },

  // ─── Get all responses ───────────────────────────────────
  async getResponses() {
    if (supabase) {
      try {
        const { data: fetched, error } = await withTimeout(
          supabase.from('responses').select('*').order('timestamp', { ascending: false }),
          SUPABASE_TIMEOUT_MS
        );
        if (error) throw error;
        if (fetched) return fetched;
      } catch (error) {
        console.warn('Supabase unavailable. Loading localStorage responses:', error.message);
      }
    }

    // Fallback: always returns data from localStorage
    return this.getLocalResponses().sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
  },

  // ─── Get local storage responses ─────────────────────────
  getLocalResponses() {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  // ─── Delete a response by ID ─────────────────────────────
  async deleteResponse(id) {
    // Always delete from localStorage
    const localData = this.getLocalResponses();
    const updatedLocal = localData.filter(item => item.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLocal));

    // Try Supabase delete (non-blocking, with timeout)
    if (supabase) {
      try {
        await withTimeout(
          supabase.from('responses').delete().eq('id', id),
          SUPABASE_TIMEOUT_MS
        );
      } catch (error) {
        console.warn('Supabase delete unavailable. Deleted from localStorage only:', error.message);
      }
    }

    return true;
  }
};
