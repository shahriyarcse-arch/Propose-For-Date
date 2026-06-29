import React, { useState } from 'react';
import ProposalFlow from './components/ProposalFlow';
import Dashboard from './components/Dashboard';

export default function App() {
  const [view, setView] = useState('proposal'); // 'proposal' or 'dashboard'

  return (
    <>
      {view === 'proposal' ? (
        <ProposalFlow />
      ) : (
        <Dashboard onBack={() => setView('proposal')} />
      )}

      {/* Secret trigger to access the admin dashboard */}
      {view === 'proposal' && (
        <div 
          className="admin-trigger" 
          onClick={() => setView('dashboard')}
          title="Admin Dashboard"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3M15.5 7.5L14 9M18.5 4.5L20 6" />
          </svg>
        </div>
      )}
    </>
  );
}
