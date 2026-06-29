import React, { useState, useEffect } from 'react';
import { db } from '../db';

const Icons = {
  Lock: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Empty: () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}>
      <path d="M22 12h-6l-3 3-3-3H2" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  Delete: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Refresh: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  Home: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
};

export default function Dashboard({ onBack }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const CORRECT_PASSCODE = '1234';

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === CORRECT_PASSCODE) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect passcode! Please try again.');
    }
  };

  const fetchResponses = async () => {
    setLoading(true);
    const data = await db.getResponses();
    setResponses(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchResponses();
      const interval = setInterval(() => {
        fetchResponses();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this response?')) {
      await db.deleteResponse(id);
      fetchResponses();
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', width: '100%' }}>
        <div className="glass-container">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Icons.Lock />
          </div>
          <h1>Admin Dashboard</h1>
          <p>Enter your secret passcode to view date responses:</p>
          
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter Passcode" 
              className="input-field"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
            />
            {error && <p style={{ color: '#ff0a54', fontSize: '1rem', marginBottom: '1.5rem', fontWeight: 600 }}>{error}</p>}
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button type="button" className="btn-no" style={{ padding: '0.8rem 1.5rem' }} onClick={onBack}>
                Back
              </button>
              <button type="submit" className="btn-primary">
                Unlock
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '2rem 1rem' }}>
      <div className="dashboard-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1>Proposal Responses</h1>
            <p style={{ margin: 0 }}>Review all submitted date proposals. (Updates in real-time)</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-no" style={{ padding: '0.6rem 1.2rem', fontSize: '1rem' }} onClick={fetchResponses}>
              <Icons.Refresh /> Refresh
            </button>
            <button className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '1rem' }} onClick={onBack}>
              <Icons.Home /> Home
            </button>
          </div>
        </div>

        {loading && responses.length === 0 ? (
          <p style={{ marginTop: '2rem', textAlign: 'center' }}>Loading responses...</p>
        ) : responses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Icons.Empty />
            </div>
            <h3>No responses yet</h3>
            <p>Share your link and wait for them to respond.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Food Preference</th>
                  <th>Date & Time</th>
                  <th>Received At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((res) => (
                  <tr key={res.id}>
                    <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{res.name}</td>
                    <td>{res.location}</td>
                    <td>{res.food}</td>
                    <td>
                      <span style={{ fontWeight: 600 }}>{res.date}</span> at <span style={{ fontStyle: 'italic' }}>{res.time}</span>
                    </td>
                    <td style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      {new Date(res.timestamp).toLocaleString()}
                    </td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(res.id)}>
                        <Icons.Delete /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
