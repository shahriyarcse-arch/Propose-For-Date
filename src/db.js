// Database wrapper for zero-setup storage with local storage fallback
const LOCAL_STORAGE_KEY = 'date_proposal_responses';

// We use a public MockAPI endpoint for zero-setup remote storage.
// This allows data to sync across devices (e.g. from her phone to your phone).
const MOCK_API_URL = 'https://66804a9d5569275da471f543.mockapi.io/api/v1/responses';

export const db = {
  // Save a new response
  async saveResponse(data) {
    const newResponse = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    // 1. Save to local storage first (always have a backup)
    const localData = this.getLocalResponses();
    localData.push({ ...newResponse, id: Date.now().toString() });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localData));

    // 2. Save to MockAPI (so it's accessible across devices)
    try {
      const response = await fetch(MOCK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newResponse),
      });

      if (!response.ok) {
        throw new Error('Failed to save to remote database');
      }
      return await response.json();
    } catch (error) {
      console.warn('Could not save to remote database. Saved locally instead:', error);
      return newResponse;
    }
  },

  // Get all responses
  async getResponses() {
    try {
      const response = await fetch(MOCK_API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch from remote database');
      }
      const remoteData = await response.json();
      
      // Merge with local storage to ensure no data is lost
      const localData = this.getLocalResponses();
      const merged = [...remoteData];
      
      // Add local responses that aren't in remote (by comparing timestamp/name)
      localData.forEach(localItem => {
        if (!merged.some(remoteItem => remoteItem.name === localItem.name && remoteItem.timestamp === localItem.timestamp)) {
          merged.push(localItem);
        }
      });
      
      return merged.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (error) {
      console.warn('Could not fetch from remote database. Showing local responses:', error);
      return this.getLocalResponses().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
  },

  // Helper: Get local storage responses
  getLocalResponses() {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Clear a response by ID
  async deleteResponse(id) {
    // 1. Delete from local storage
    const localData = this.getLocalResponses();
    const updatedLocal = localData.filter(item => item.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLocal));

    // 2. Delete from remote database (if it's a remote ID)
    try {
      const response = await fetch(`${MOCK_API_URL}/${id}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.warn('Could not delete from remote database. Deleted locally:', error);
      return true;
    }
  }
};
