import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Unique Proposal Link',
    desc: 'Get a short, shareable link with your name and your partner\'s name. Share it anywhere — WhatsApp, Messenger, or SMS.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    )
  },
  {
    title: 'Interactive Flow',
    desc: 'Your partner will see a beautiful, personalized proposal page with the playful "dodge button" and all the romantic animations.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    )
  },
  {
    title: 'See Their Response',
    desc: 'Create a passcode when you make the link, then use it later to see your partner\'s date choices in the dashboard.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )
  }
];

const steps = [
  { num: '1', label: 'Enter your name & your partner\'s name' },
  { num: '2', label: 'Set a passcode (optional) & generate your unique link' },
  { num: '3', label: 'Share the link with your special someone' },
  { num: '4', label: 'They pick the date details — and it\'s locked in! 💕' }
];

export default function PublicLanding({ onEnterGenerator }) {
  return (
    <div className="flow-wrapper" style={{ justifyContent: 'flex-start', paddingTop: '3rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-container"
        style={{ maxWidth: '760px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <svg width="72" height="72" viewBox="0 0 24 24" fill="var(--primary)" style={{ filter: 'drop-shadow(0 8px 20px var(--primary-glow))' }}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        <h1>Create a Date Proposal<br />Worth Saying Yes To</h1>
        <p style={{ fontSize: 'clamp(1.1rem, 3vw, 1.35rem)', marginBottom: '2.5rem' }}>
          Generate a unique, interactive proposal link and share it with your crush, partner, or special someone.<br />
          They'll love the experience — and you'll love the answer. 💖
        </p>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary"
          style={{ marginBottom: '3rem' }}
          onClick={onEnterGenerator}
        >
          Create Your Proposal Link ✨
        </motion.button>

        <div style={{ width: '100%', borderTop: '2px solid var(--card-border)', paddingTop: '2.5rem', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', fontWeight: 800, marginBottom: '2rem', background: 'linear-gradient(135deg, var(--accent), var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>How It Works</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                style={{ flex: '0 0 calc(50% - 0.75rem)', maxWidth: '320px', display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left', background: 'rgba(255,255,255,0.5)', padding: '1rem 1.2rem', borderRadius: '16px', border: '1.5px solid rgba(255,255,255,0.7)' }}
              >
                <span style={{ background: 'linear-gradient(135deg, var(--accent), var(--primary))', color: 'white', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem', flexShrink: 0 }}>{s.num}</span>
                <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: '1rem' }}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div style={{ width: '100%', borderTop: '2px solid var(--card-border)', paddingTop: '2.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                style={{ flex: '0 0 calc(33.333% - 1.35rem)', minWidth: '200px', textAlign: 'center' }}
              >
                <div style={{ marginBottom: '0.8rem', display: 'flex', justifyContent: 'center' }}>{f.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.4rem', color: 'var(--text)' }}>{f.title}</h3>
                <p style={{ fontSize: '0.95rem', margin: 0 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)', opacity: 0.65, fontWeight: 600, textAlign: 'center', letterSpacing: '0.5px' }}>
        Designed with ❤️ by <a href="https://github.com/shahriyarcse-arch" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>Shahriyar</a>
      </div>
    </div>
  );
}
