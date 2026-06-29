import React, { useState, useRef, useEffect } from 'react';
import { db } from '../db';

// High-Quality SVG Icons for a Professional & Consistent Look
const Icons = {
  Heart: () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--primary)', filter: 'drop-shadow(0 4px 10px var(--primary-glow))' }}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  User: () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  LocationPin: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  FoodFork: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  Calendar: () => (
    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  SuccessBadge: () => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 8px 15px var(--primary-glow))' }}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Cafe: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  Restaurant: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 22V2h-2v20M2 10V2h2v8M6 2v8h2V2M10 2v8h2V2M6 22v-8h6v8" />
    </svg>
  ),
  Park: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 22h20L12 2z" />
      <path d="M12 6l-6 12h12L12 6z" />
    </svg>
  ),
  Rooftop: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22h20M4 22V10h16v12M12 4v6M8 6h8" />
    </svg>
  ),
  CoffeeDessert: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 0-4 4v2h8V6a4 4 0 0 0-4-4zM4 14h16v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-5z" />
      <circle cx="12" cy="11" r="1" />
    </svg>
  ),
  PizzaPasta: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 11l-9 9M19 5l-7 7M22 2L2 22h20V2z" />
    </svg>
  ),
  SushiAsian: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="8" width="20" height="12" rx="4" />
      <ellipse cx="7" cy="14" rx="2" ry="4" />
      <ellipse cx="17" cy="14" rx="2" ry="4" />
    </svg>
  ),
  LocalSpicy: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10c4.5 0 8-3.5 10-8H2" />
    </svg>
  )
};

export default function ProposalFlow() {
  const [step, setStep] = useState(1); // 1: Will you, 2: Name input, 3: Location, 4: Cuisine, 5: Timing, 6: Success
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    food: '',
    date: '',
    time: ''
  });
  
  const [noBtnStyle, setNoBtnStyle] = useState({});
  const btnContainerRef = useRef(null);
  const [hearts, setHearts] = useState([]);

  // Generate floating background hearts
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random();
      const newHeart = {
        id,
        left: Math.random() * 100 + 'vw',
        fontSize: Math.random() * 20 + 15 + 'px',
        animationDuration: Math.random() * 3 + 5 + 's',
      };
      setHearts(prev => [...prev.slice(-12), newHeart]);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const handleNoHoverOrTouch = () => {
    if (!btnContainerRef.current) return;
    const container = btnContainerRef.current;
    const rect = container.getBoundingClientRect();

    const randomX = Math.floor(Math.random() * (rect.width - 120));
    const randomY = Math.floor((Math.random() * 140) - 70);

    setNoBtnStyle({
      position: 'absolute',
      left: `${randomX}px`,
      top: `${randomY}px`,
      transition: 'all 0.15s ease'
    });
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const selectOption = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await db.saveResponse(formData);
    setStep(6);
  };

  const locations = [
    { id: 'Cafe', label: 'Cozy Cafe', desc: 'Sip coffee & talk life', icon: <Icons.Cafe /> },
    { id: 'Restaurant', label: 'Fancy Dinner', desc: 'Premium culinary vibe', icon: <Icons.Restaurant /> },
    { id: 'Park', label: 'Scenic Park', desc: 'Walk under autumn leaves', icon: <Icons.Park /> },
    { id: 'Rooftop', label: 'Rooftop Lounge', desc: 'Sunset & open sky views', icon: <Icons.Rooftop /> }
  ];

  const foods = [
    { id: 'Coffee & Dessert', label: 'Coffee & Cakes', desc: 'Sweet, rich desserts', icon: <Icons.CoffeeDessert /> },
    { id: 'Pizza & Pasta', label: 'Italian Special', desc: 'Pizza slice & pasta bowl', icon: <Icons.PizzaPasta /> },
    { id: 'Sushi & Asian', label: 'Sushi & Asian', desc: 'Savory & oriental rolls', icon: <Icons.SushiAsian /> },
    { id: 'Fuchka & Chotpoti', label: 'Spicy Local Treats', desc: 'Classic Fuchka & Tangy mix', icon: <Icons.LocalSpicy /> }
  ];

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Floating Hearts Background */}
      {hearts.map(h => (
        <span
          key={h.id}
          className="heart"
          style={{
            left: h.left,
            fontSize: h.fontSize,
            animationDuration: h.animationDuration
          }}
        >
          ❤️
        </span>
      ))}

      {/* Screen 1: Will you go on a date with me? */}
      {step === 1 && (
        <div className="glass-container">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <Icons.Heart />
          </div>
          <h1>Will you go on a date with me?</h1>
          <p>Let's write a beautiful chapter together. Say yes!</p>
          
          <div className="btn-container" ref={btnContainerRef}>
            <button 
              className="btn-primary btn-yes" 
              onClick={handleNext}
            >
              Yes! 😍
            </button>
            <button 
              className="btn-no" 
              style={noBtnStyle}
              onMouseEnter={handleNoHoverOrTouch}
              onTouchStart={handleNoHoverOrTouch}
            >
              No 😢
            </button>
          </div>
        </div>
      )}

      {/* Screen 2: Enter Name */}
      {step === 2 && (
        <div className="glass-container">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <Icons.User />
          </div>
          <h1>I knew you'd say Yes!</h1>
          <p>Before we outline our details, tell me your lovely name:</p>
          
          <input 
            type="text" 
            placeholder="Type your name here..." 
            className="input-field"
            value={formData.name}
            onChange={(e) => selectOption('name', e.target.value)}
          />
          
          <button 
            className="btn-primary" 
            onClick={handleNext}
            disabled={!formData.name.trim()}
          >
            Continue ✨
          </button>
        </div>
      )}

      {/* Screen 3: Choose Location */}
      {step === 3 && (
        <div className="glass-container wide">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Icons.LocationPin />
          </div>
          <h1>Where are we going?</h1>
          <p>Select your favorite atmosphere for our date</p>
          
          <div className="options-grid">
            {locations.map(loc => (
              <div 
                key={loc.id} 
                className={`option-card ${formData.location === loc.id ? 'selected' : ''}`}
                onClick={() => selectOption('location', loc.id)}
              >
                <div className="option-emoji">{loc.icon}</div>
                <div className="option-label">{loc.label}</div>
                <div className="option-desc">{loc.desc}</div>
              </div>
            ))}
          </div>

          <button 
            className="btn-primary" 
            onClick={handleNext}
            disabled={!formData.location}
          >
            Select Cuisine ➡️
          </button>
        </div>
      )}

      {/* Screen 4: Choose Cuisine */}
      {step === 4 && (
        <div className="glass-container wide">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Icons.FoodFork />
          </div>
          <h1>What are we eating?</h1>
          <p>Pick your preferred cuisine or delicacy</p>
          
          <div className="options-grid">
            {foods.map(food => (
              <div 
                key={food.id} 
                className={`option-card ${formData.food === food.id ? 'selected' : ''}`}
                onClick={() => selectOption('food', food.id)}
              >
                <div className="option-emoji">{food.icon}</div>
                <div className="option-label">{food.label}</div>
                <div className="option-desc">{food.desc}</div>
              </div>
            ))}
          </div>

          <button 
            className="btn-primary" 
            onClick={handleNext}
            disabled={!formData.food}
          >
            Select Date & Time 📅
          </button>
        </div>
      )}

      {/* Screen 5: Choose Date and Time */}
      {step === 5 && (
        <div className="glass-container">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <Icons.Calendar />
          </div>
          <h1>When are you free?</h1>
          <p>Schedule a perfect date and time for us</p>

          <div className="datetime-container">
            <div className="datetime-group">
              <label>Select Date:</label>
              <input 
                type="date" 
                className="input-field" 
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={(e) => selectOption('date', e.target.value)}
              />
            </div>

            <div className="datetime-group">
              <label>Select Time or Slot:</label>
              <input 
                type="text" 
                placeholder="e.g. Afternoon, 6:00 PM, Sunset" 
                className="input-field" 
                value={formData.time}
                onChange={(e) => selectOption('time', e.target.value)}
              />
            </div>
          </div>

          <button 
            className="btn-primary" 
            onClick={handleSubmit}
            disabled={!formData.date || !formData.time.trim()}
          >
            Lock It In! 🔒❤️
          </button>
        </div>
      )}

      {/* Screen 6: Confirmation Screen */}
      {step === 6 && (
        <div className="glass-container">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <Icons.SuccessBadge />
          </div>
          <h1>It's a Date!</h1>
          <p style={{ fontSize: '1.4rem', color: 'var(--primary)', fontWeight: 700 }}>
            Yay, {formData.name}!
          </p>
          <p style={{ fontSize: '1.2rem' }}>
            I am super excited! Our schedule is locked:
            <br />
            📍 Location: <strong>{formData.location}</strong>
            <br />
            🍔 Cuisine: <strong>{formData.food}</strong>
            <br />
            📅 Time: <strong>{formData.date}</strong> at <strong>{formData.time}</strong>
          </p>
          <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '2rem', marginTop: '2rem' }}>
            <p style={{ fontSize: '1rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>Response logged successfully. See you soon! 🥰</p>
          </div>
        </div>
      )}
    </div>
  );
}
