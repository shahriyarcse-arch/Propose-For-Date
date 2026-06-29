import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../db';

// High-Quality SVG Icons for a Professional & Consistent Look
const Icons = {
  Heart: () => (
    <svg width="90" height="90" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--primary)', filter: 'drop-shadow(0 8px 20px var(--primary-glow))' }}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  User: () => (
    <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  LocationPin: () => (
    <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  FoodFork: () => (
    <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  Calendar: () => (
    <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  SuccessBadge: () => (
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 8px 15px var(--primary-glow))' }}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Cafe: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  Restaurant: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 22V2h-2v20M2 10V2h2v8M6 2v8h2V2M10 2v8h2V2M6 22v-8h6v8" />
    </svg>
  ),
  Park: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 22h20L12 2z" />
      <path d="M12 6l-6 12h12L12 6z" />
    </svg>
  ),
  Rooftop: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22h20M4 22V10h16v12M12 4v6M8 6h8" />
    </svg>
  ),
  CoffeeDessert: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 0-4 4v2h8V6a4 4 0 0 0-4-4zM4 14h16v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-5z" />
      <circle cx="12" cy="11" r="1" />
    </svg>
  ),
  PizzaPasta: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 11l-9 9M19 5l-7 7M22 2L2 22h20V2z" />
    </svg>
  ),
  SushiAsian: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="8" width="20" height="12" rx="4" />
      <ellipse cx="7" cy="14" rx="2" ry="4" />
      <ellipse cx="17" cy="14" rx="2" ry="4" />
    </svg>
  ),
  LocalSpicy: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10c4.5 0 8-3.5 10-8H2" />
    </svg>
  ),
  Sun: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
  CloudSun: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M19.07 4.93l-1.41 1.41" />
      <path d="M15.28 18.28A6 6 0 1 0 7 15H6a4 4 0 0 0 0 8h9.5a3.5 3.5 0 0 0 .78-7" />
    </svg>
  ),
  Sunset: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 18a5 5 0 0 0-10 0M12 9v4M19 13.5l-1.5-1.5M5 13.5L6.5 12M2 22h20M12 2v3M4.9 6.4l1.4 1.4M19.1 6.4l-1.4 1.4" />
    </svg>
  ),
  Moon: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  ),
  HeartMini: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--primary)', opacity: 0.8 }}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  ShieldAlert: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 8v4M12 16h.01" />
    </svg>
  ),
  Sparkles: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M12 3v1M12 20v1M3 12h1M20 12h1M5.9 5.9l.7.7M17.4 17.4l.7.7M17.4 6.6l-.7.7M6.6 17.4l-.7.7" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
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
  
  // No button dodge system — uses refs to avoid stale closures
  const [noBtnStyle, setNoBtnStyle] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const noBtnPosRef = useRef({ x: 0, y: 0 });
  const btnContainerRef = useRef(null);
  const noBtnRef = useRef(null);
  const dodgeCount = useRef(0);
  const [noEmoji, setNoEmoji] = useState('😢');
  const [hearts, setHearts] = useState([]);

  const noEmojis = ['', '', '', '', '', '', '', '', '', '', '', ''];

  // Generate floating background hearts
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random();
      const newHeart = {
        id,
        left: Math.random() * 100 + 'vw',
        fontSize: Math.random() * 20 + 20 + 'px',
        animationDuration: Math.random() * 3 + 5 + 's',
      };
      setHearts(prev => [...prev.slice(-12), newHeart]);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Core dodge function — keeps No button strictly inside the visible viewport
  const dodgeNoButton = useCallback(() => {
    if (!noBtnRef.current) return;

    const cur = noBtnPosRef.current;
    const btn = noBtnRef.current;
    const btnW = btn.offsetWidth || 100;
    const btnH = btn.offsetHeight || 40;

    // Safe area: viewport minus button size minus 20px margin on each side
    const safeW = window.innerWidth - btnW - 40;
    const safeH = window.innerHeight - btnH - 40;

    // maxX/maxY are how far the button can translate from its original center position
    const maxX = Math.max(60, safeW / 2);
    const maxY = Math.max(60, safeH / 2);

    // Generate a new position guaranteed to be far from the current one
    let newX, newY, attempts = 0;
    do {
      newX = (Math.random() * 2 - 1) * maxX;
      newY = (Math.random() * 2 - 1) * maxY;
      attempts++;
    } while (
      Math.sqrt((newX - cur.x) ** 2 + (newY - cur.y) ** 2) < 120 &&
      attempts < 30
    );

    // Update ref immediately (no stale closure)
    noBtnPosRef.current = { x: newX, y: newY };
    dodgeCount.current += 1;

    // Playful rotation and scale wobble
    const rot = (Math.random() - 0.5) * 50;
    const scl = 0.85 + Math.random() * 0.3;

    setNoBtnStyle({ x: newX, y: newY, rotate: rot, scale: scl });

    // Cycle through funny emojis
    setNoEmoji(noEmojis[dodgeCount.current % noEmojis.length]);
  }, []);

  // Proximity detection: mouse/touch within 120px of No button triggers dodge
  useEffect(() => {
    if (step !== 1) return;

    const onPointerMove = (e) => {
      if (!noBtnRef.current) return;

      const rect = noBtnRef.current.getBoundingClientRect();
      const btnCX = rect.left + rect.width / 2;
      const btnCY = rect.top + rect.height / 2;

      // Correctly extract coordinates for mouse or touch events
      let clientX = 0;
      let clientY = 0;

      if (e.type === 'touchmove' || e.type === 'touchstart') {
        if (e.touches && e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
          clientX = e.changedTouches[0].clientX;
          clientY = e.changedTouches[0].clientY;
        }
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const dist = Math.sqrt((clientX - btnCX) ** 2 + (clientY - btnCY) ** 2);

      // 120px proximity threshold to trigger well before click/touch
      if (dist < 120) {
        // Prevent default touch behavior (scrolling/rubber-banding) on mobile step 1 during dodge
        if (e.cancelable) {
          e.preventDefault();
        }
        dodgeNoButton();
      }
    };

    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchstart', onPointerMove, { passive: false });
    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchstart', onPointerMove);
    };
  }, [step, dodgeNoButton]);

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const selectOption = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await db.saveResponse(formData);
    setStep(6);
  };

  const locations = [
    { id: 'Cafe', label: 'Cozy Cafe', desc: 'Grab a coffee and chat', icon: <Icons.Cafe /> },
    { id: 'Restaurant', label: 'Nice Dinner', desc: 'Go out for dinner', icon: <Icons.Restaurant /> },
    { id: 'Park', label: 'Scenic Park', desc: 'Take a walk in the park', icon: <Icons.Park /> },
    { id: 'Rooftop', label: 'Rooftop', desc: 'Hang out with a view', icon: <Icons.Rooftop /> }
  ];

  const foods = [
    { id: 'Coffee & Dessert', label: 'Coffee & Dessert', desc: 'Sweets and drinks', icon: <Icons.CoffeeDessert /> },
    { id: 'Pizza & Pasta', label: 'Pizza & Pasta', desc: 'Italian favorites', icon: <Icons.PizzaPasta /> },
    { id: 'Sushi & Asian', label: 'Sushi & Asian', desc: 'Dumplings, noodles or sushi', icon: <Icons.SushiAsian /> },
    { id: 'Fuchka & Chotpoti', label: 'Fuchka & Street Food', desc: 'Spicy local delicacies', icon: <Icons.LocalSpicy /> }
  ];

  // Motion config — clean fade transition with zero sliding or scaling to prevent layout shifting
  const stepMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.12, ease: "easeOut" }
  };

  return (
    <div className={`flow-wrapper ${step === 1 ? 'no-scroll' : ''}`}>
      {/* Floating Hearts Background */}
      <div className="hearts-container">
        {hearts.map(h => (
          <span
            key={h.id}
            className="heart"
            style={{
              left: h.left,
              width: h.fontSize,
              height: h.fontSize,
              animationDuration: h.animationDuration,
              display: 'block'
            }}
          >
            <Icons.HeartMini />
          </span>
        ))}
      </div>

      {/* Slide Transition Wrapper */}
      <AnimatePresence mode="wait">
        
        {/* Screen 1: Will you go on a date with me? */}
        {step === 1 && (
          <motion.div key="step1" {...stepMotion} className="glass-container">
             <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <Icons.Heart />
            </div>
            <h1>Are you free to go out with me sometime?</h1>
            <p>Select your answer below:</p>
            
            <div className="btn-container" ref={btnContainerRef}>
              <motion.button 
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary btn-yes" 
                onClick={handleNext}
              >
                Yes! <Icons.HeartMini />
              </motion.button>
              <motion.button 
                ref={noBtnRef}
                className="btn-no" 
                animate={{ 
                  x: noBtnStyle.x, 
                  y: noBtnStyle.y, 
                  rotate: noBtnStyle.rotate, 
                  scale: noBtnStyle.scale 
                }}
                transition={{ type: "spring", stiffness: 220, damping: 14, mass: 0.4 }}
                onMouseEnter={dodgeNoButton}
                onTouchStart={dodgeNoButton}
                onClick={dodgeNoButton}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Icons.ShieldAlert /> No
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Screen 2: Enter Name */}
        {step === 2 && (
          <motion.div key="step2" {...stepMotion} className="glass-container">
             <button className="btn-back" onClick={handleBack}>← Back</button>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <Icons.User />
            </div>
            <h1>Awesome! Let's plan it out.</h1>
            <p>What is your name?</p>
            
            <input 
              type="text" 
              placeholder="Type your name here..." 
              className="input-field"
              value={formData.name}
              onChange={(e) => selectOption('name', e.target.value)}
              autoFocus
            />
            
            <div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="btn-primary" 
                onClick={handleNext}
                disabled={!formData.name.trim()}
              >
                Continue <Icons.Sparkles />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Screen 3: Choose Location */}
        {step === 3 && (
          <motion.div key="step3" {...stepMotion} className="glass-container wide">
            <button className="btn-back" onClick={handleBack}>← Back</button>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <Icons.LocationPin />
            </div>
            <h1>Where should we go?</h1>
            <p>Pick a location you prefer:</p>
            
            <div className="options-grid">
              {locations.map((loc, idx) => (
                <motion.div 
                  key={loc.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`option-card ${formData.location === loc.id ? 'selected' : ''}`}
                  onClick={() => selectOption('location', loc.id)}
                >
                  <div className="option-emoji">{loc.icon}</div>
                  <div className="option-label">{loc.label}</div>
                  <div className="option-desc">{loc.desc}</div>
                </motion.div>
              ))}
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary" 
              onClick={handleNext}
              disabled={!formData.location}
            >
              Select Cuisine <Icons.ArrowRight />
            </motion.button>
          </motion.div>
        )}

        {/* Screen 4: Choose Cuisine */}
        {step === 4 && (
          <motion.div key="step4" {...stepMotion} className="glass-container wide">
            <button className="btn-back" onClick={handleBack}>← Back</button>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <Icons.FoodFork />
            </div>
            <h1>What should we eat?</h1>
            <p>Choose your favorite food option:</p>
            
            <div className="options-grid">
              {foods.map((food, idx) => (
                <motion.div 
                  key={food.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`option-card ${formData.food === food.id ? 'selected' : ''}`}
                  onClick={() => selectOption('food', food.id)}
                >
                  <div className="option-emoji">{food.icon}</div>
                  <div className="option-label">{food.label}</div>
                  <div className="option-desc">{food.desc}</div>
                </motion.div>
              ))}
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary" 
              onClick={handleNext}
              disabled={!formData.food}
            >
              Select Date & Time <Icons.ArrowRight />
            </motion.button>
          </motion.div>
        )}

        {/* Screen 5: Choose Date and Time */}
        {step === 5 && (() => {
          const today = new Date();
          const currentMonth = formData._calMonth ?? today.getMonth();
          const currentYear = formData._calYear ?? today.getFullYear();
          const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
          const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
          const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
          const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

          const prevMonth = () => {
            let m = currentMonth - 1, y = currentYear;
            if (m < 0) { m = 11; y--; }
            setFormData(p => ({ ...p, _calMonth: m, _calYear: y }));
          };
          const nextMonth = () => {
            let m = currentMonth + 1, y = currentYear;
            if (m > 11) { m = 0; y++; }
            setFormData(p => ({ ...p, _calMonth: m, _calYear: y }));
          };

          const selectDate = (day) => {
            const mm = String(currentMonth + 1).padStart(2, '0');
            const dd = String(day).padStart(2, '0');
            const dateStr = `${currentYear}-${mm}-${dd}`;
            selectOption('date', dateStr);
          };

          const isToday = (day) => {
            return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
          };
          const isPast = (day) => {
            const d = new Date(currentYear, currentMonth, day);
            const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            return d < t;
          };
          const isSelected = (day) => {
            const mm = String(currentMonth + 1).padStart(2, '0');
            const dd = String(day).padStart(2, '0');
            return formData.date === `${currentYear}-${mm}-${dd}`;
          };

          const timeSlots = [
            { id: 'Morning', label: 'Morning', emoji: <Icons.Sun />, desc: '8 AM – 12 PM' },
            { id: 'Afternoon', label: 'Afternoon', emoji: <Icons.CloudSun />, desc: '12 PM – 4 PM' },
            { id: 'Evening', label: 'Evening', emoji: <Icons.Sunset />, desc: '4 PM – 7 PM' },
            { id: 'Night', label: 'Night', emoji: <Icons.Moon />, desc: '7 PM – 11 PM' },
          ];

          return (
          <motion.div key="step5" {...stepMotion} className="glass-container wide">
            <button className="btn-back" onClick={handleBack}>← Back</button>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <Icons.Calendar />
            </div>
            <h1>When are you free?</h1>
            <p>Select a date and time slot:</p>

            {/* Custom Calendar */}
            <div className="custom-calendar">
              <div className="cal-header">
                <button className="cal-nav-btn" onClick={prevMonth}>‹</button>
                <span className="cal-month-title">{monthNames[currentMonth]} {currentYear}</span>
                <button className="cal-nav-btn" onClick={nextMonth}>›</button>
              </div>
              <div className="cal-days-header">
                {dayNames.map(d => <div key={d} className="cal-day-name">{d}</div>)}
              </div>
              <div className="cal-grid">
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="cal-cell cal-empty"></div>
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const past = isPast(day);
                  return (
                    <motion.div
                      key={day}
                      whileHover={!past ? { scale: 1.15 } : {}}
                      whileTap={!past ? { scale: 0.9 } : {}}
                      className={`cal-cell ${isSelected(day) ? 'cal-selected' : ''} ${isToday(day) ? 'cal-today' : ''} ${past ? 'cal-disabled' : ''}`}
                      onClick={() => !past && selectDate(day)}
                    >
                      {day}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Cards */}
            <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.6rem)', fontWeight: 800, color: 'var(--text)', margin: '2.5rem 0 1.5rem', width: '100%', textAlign: 'left' }}>Pick a Time Slot</h2>
            <div className="time-slots-grid">
              {timeSlots.map((slot, idx) => (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`time-slot-card ${formData.time === slot.id ? 'selected' : ''}`}
                  onClick={() => selectOption('time', slot.id)}
                >
                  <span className="time-slot-emoji">{slot.emoji}</span>
                  <span className="time-slot-label">{slot.label}</span>
                  <span className="time-slot-desc">{slot.desc}</span>
                </motion.div>
              ))}
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary" 
              onClick={handleSubmit}
              disabled={!formData.date || !formData.time}
              style={{ marginTop: '2.5rem' }}
            >
              Lock It In! <Icons.ShieldAlert />
            </motion.button>
          </motion.div>
          );
        })()}

        {/* Screen 6: Confirmation Screen */}
        {step === 6 && (
          <motion.div key="step6" {...stepMotion} className="glass-container">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <Icons.SuccessBadge />
            </div>
            <h1>It's a Date!</h1>
            <p style={{ fontSize: '1.8rem', color: 'var(--primary)', fontWeight: 800, marginBottom: '1.5rem' }}>
              Awesome, {formData.name}!
            </p>
            <p style={{ fontSize: '1.5rem', lineHeight: '1.8' }}>
              Our schedule is set:
              <br />
              Location: <strong>{formData.location}</strong>
              <br />
              Food: <strong>{formData.food}</strong>
              <br />
              Time: <strong>{formData.date}</strong> at <strong>{formData.time}</strong>
            </p>
            <div style={{ borderTop: '2px solid var(--card-border)', paddingTop: '2.5rem', marginTop: '2.5rem' }}>
              <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>Response saved. Talk to you soon!</p>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
