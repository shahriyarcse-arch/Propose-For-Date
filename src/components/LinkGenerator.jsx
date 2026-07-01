import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../db';

export default function LinkGenerator({ onBack }) {
  const [by, setBy] = useState('');
  const [to, setTo] = useState('');
  const [passcode, setPasscode] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [copied, setCopied] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const [useShortLink, setUseShortLink] = useState(true);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!by.trim() || !to.trim()) return;

    setIsCreating(true);
    setError('');

    try {
      if (useShortLink) {
        // Save to proposals table and get a short unique ID
        const proposal = await db.saveProposal({
          sender_name: by.trim(),
          recipient_name: to.trim(),
          passcode: passcode.trim()
        });
        const link = `${window.location.origin}/?id=${proposal.id}`;
        setGeneratedLink(link);
        setShortLink(link);
      } else {
        // Traditional URL param-based link (no DB needed)
        const query = new URLSearchParams({
          by: by.trim(),
          to: to.trim(),
          p: passcode.trim()
        });
        const link = `${window.location.origin}/?${query.toString()}`;
        setGeneratedLink(link);
        setShortLink('');
      }
      setCopied('');
    } catch (err) {
      setError('Could not save to database. Try "Simple Link" mode below.');
      console.error('Link generation failed:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopy = (type) => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(type);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="dashboard-wrapper">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="glass-container"
        style={{ maxWidth: '520px' }}
      >
        <h1>Create Your Proposal Link 💖</h1>
        <p>Generate a customized, interactive date proposal link to share with your partner.</p>

        {!generatedLink ? (
          <form onSubmit={handleGenerate} style={{ width: '100%' }}>
            <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              <label style={{ fontWeight: 700, display: 'block', marginBottom: '0.5rem', color: 'var(--text)' }}>Your Name:</label>
              <input 
                type="text" 
                placeholder="e.g. Rahul" 
                className="input-field"
                value={by}
                onChange={(e) => setBy(e.target.value)}
                required
              />
            </div>

            <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              <label style={{ fontWeight: 700, display: 'block', marginBottom: '0.5rem', color: 'var(--text)' }}>Your Partner's Name:</label>
              <input 
                type="text" 
                placeholder="e.g. Riya" 
                className="input-field"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </div>

            <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              <label style={{ fontWeight: 700, display: 'block', marginBottom: '0.5rem', color: 'var(--text)' }}>Create a 4-Digit Passcode (Optional — To see their response later):</label>
              <input 
                type="text" 
                maxLength="4"
                pattern="\d{4}"
                placeholder="e.g. 1234" 
                className="input-field"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value.replace(/\D/g, ''))}
              />
            </div>

            {/* Link type toggle */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '2rem', background: 'rgba(255,255,255,0.5)', padding: 'clamp(0.5rem, 2vw, 0.8rem) clamp(0.8rem, 3vw, 1.2rem)', borderRadius: '16px', border: '1.5px solid rgba(255,255,255,0.7)' }}>
              <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)' }}>Link type:</span>
              <button
                type="button"
                onClick={() => setUseShortLink(true)}
                style={{
                  padding: 'clamp(0.4rem, 1.5vw, 0.6rem) clamp(0.8rem, 3vw, 1.4rem)',
                  borderRadius: '50px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
                  cursor: 'pointer',
                  background: useShortLink ? 'linear-gradient(135deg, var(--accent), var(--primary))' : 'rgba(255,255,255,0.7)',
                  color: useShortLink ? 'white' : 'var(--text-muted)',
                  transition: 'all 0.2s'
                }}
              >
                Short Link ✨
              </button>
              <button
                type="button"
                onClick={() => setUseShortLink(false)}
                style={{
                  padding: 'clamp(0.4rem, 1.5vw, 0.6rem) clamp(0.8rem, 3vw, 1.4rem)',
                  borderRadius: '50px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
                  cursor: 'pointer',
                  background: !useShortLink ? 'linear-gradient(135deg, var(--accent), var(--primary))' : 'rgba(255,255,255,0.7)',
                  color: !useShortLink ? 'white' : 'var(--text-muted)',
                  transition: 'all 0.2s'
                }}
              >
                Simple Link 🔗
              </button>
            </div>

            {useShortLink && (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '-1.2rem', marginBottom: '1.5rem' }}>
                Short Link saves to database for a clean URL like <code style={{ background: 'rgba(0,0,0,0.05)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>/?id=abc123</code>
              </p>
            )}

            {error && <p style={{ color: '#ff0a54', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>{error}</p>}

            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button" 
                className="btn-no" 
                onClick={onBack}
              >
                Back
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit" 
                className="btn-primary"
                disabled={isCreating}
              >
                {isCreating ? 'Creating...' : 'Generate Link ✨'}
              </motion.button>
            </div>
          </form>
        ) : (
          <div style={{ width: '100%' }}>
            <p style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.2rem', marginBottom: '1.5rem' }}>Your link is ready! Copy and send it to {to}:</p>
            
            <textarea 
              readOnly 
              className="input-field"
              value={generatedLink}
              style={{ height: 'clamp(60px, 10vw, 80px)', resize: 'none', padding: 'clamp(0.6rem, 2vw, 1rem)', fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)', fontFamily: 'monospace', marginBottom: '1.5rem' }}
              onClick={(e) => e.target.select()}
            />

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
                onClick={() => handleCopy('link')}
              >
                {copied === 'link' ? 'Copied! ✅' : 'Copy Link 📋'}
              </motion.button>
              {!shortLink && (
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                  style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
                  onClick={() => handleCopy('share')}
                >
                  {copied === 'share' ? 'Copied! ✅' : 'Copy Share Text 💬'}
                </motion.button>
              )}
            </div>

            {!shortLink && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.5)', borderRadius: '16px', border: '1.5px solid rgba(255,255,255,0.7)' }}>
                <p style={{ fontSize: '0.95rem', margin: '0 0 0.5rem', fontWeight: 600, color: 'var(--text)' }}>Share this message:</p>
                <textarea
                  readOnly
                  style={{ width: '100%', border: 'none', background: 'transparent', fontFamily: 'var(--font)', fontSize: '0.95rem', color: 'var(--text-muted)', resize: 'none', height: '70px', padding: '0.5rem' }}
                  value={`Hey ${to}! 💕\n${by} has created a special date proposal just for you!\nOpen this link and find out: ${generatedLink}`}
                  onClick={(e) => e.target.select()}
                />
              </div>
            )}

            {shortLink && (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                Your proposal is saved. Use your passcode in the admin dashboard to view {to}'s response later.
              </p>
            )}

            <div style={{ marginTop: '2rem' }}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-no" 
                onClick={() => { setGeneratedLink(''); setShortLink(''); setError(''); }}
                style={{ padding: '0.8rem 2rem' }}
              >
                Create Another
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
