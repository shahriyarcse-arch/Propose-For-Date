import React, { useState, useRef, useEffect } from 'react';
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
  
  // State to track No button coordinates
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
  const btnContainerRef = useRef(null);
  const [hearts, setHearts] = useState([]);

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

  const handleNoHoverOrTouch = () => {
    if (!btnContainerRef.current) return;
    const container = btnContainerRef.current;
    const rect = container.getBoundingClientRect();

    // Calculate available space inside the glass card
    const cardWidth = rect.width;
    const cardHeight = rect.height;

    // Wider random movement range for more playful escape
    const maxX = Math.min(cardWidth / 2 - 60, 250);
    const maxY = Math.min(cardHeight / 2 - 30, 150);

    // Ensure it always moves significantly away from current position
    let newX, newY;
    do {
      newX = (Math.random() * 2 - 1) * maxX;
      newY = (Math.random() * 2 - 1) * maxY;
    } while (Math.abs(newX - noBtnPos.x) < 80 && Math.abs(newY - noBtnPos.y) < 40);

    setNoBtnPos({ x: newX, y: newY });
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => Math.max(2, prev - 1));
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

  // Motion config — snappy instant transitions
  const stepMotion = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -20 },
    transition: { type: "spring", stiffness: 500, damping: 35, mass: 0.8 }
  };

  return (
    <div className="flow-wrapper">
      {/* Floating Hearts Background */}
      <div className="hearts-container">
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
      </div>

      {/* Slide Transition Wrapper */}
      <AnimatePresence mode="wait">
        
        {/* Screen 1: Will you go on a date with me? */}
        {step === 1 && (
          <motion.div key="step1" {...stepMotion} className="glass-container">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <Icons.Heart />
            </div>
            <h1>Will you go on a date with me?</h1>
            <p>Let's write a beautiful chapter together. Say yes!</p>
            
            <div className="btn-container" ref={btnContainerRef}>
              <motion.button 
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary btn-yes" 
                onClick={handleNext}
              >
                Yes! 😍
              </motion.button>
              <motion.button 
                className="btn-no" 
                animate={{ x: noBtnPos.x, y: noBtnPos.y }}
                transition={{ type: "spring", stiffness: 120, damping: 10, mass: 0.6 }}
                onMouseEnter={handleNoHoverOrTouch}
                onTouchStart={handleNoHoverOrTouch}
                onClick={handleNoHoverOrTouch}
              >
                No 😢
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
            <h1>I knew you'd say Yes!</h1>
            <p>Before we outline our details, tell me your lovely name:</p>
            
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
                Continue ✨
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
            <h1>Where are we going?</h1>
            <p>Select your favorite atmosphere for our date</p>
            
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
              Select Cuisine ➡️
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
            <h1>What are we eating?</h1>
            <p>Pick your preferred cuisine or delicacy</p>
            
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
              Select Date & Time 📅
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
            { id: 'Morning ☀️', label: 'Morning', emoji: '☀️', desc: '8 AM – 12 PM' },
            { id: 'Afternoon 🌤️', label: 'Afternoon', emoji: '🌤️', desc: '12 PM – 4 PM' },
            { id: 'Evening 🌅', label: 'Evening', emoji: '🌅', desc: '4 PM – 7 PM' },
            { id: 'Night 🌙', label: 'Night', emoji: '🌙', desc: '7 PM – 11 PM' },
          ];

          return (
          <motion.div key="step5" {...stepMotion} className="glass-container wide">
            <button className="btn-back" onClick={handleBack}>← Back</button>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <Icons.Calendar />
            </div>
            <h1>When are you free?</h1>
            <p>Pick a perfect date and time for us</p>

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
              Lock It In! 🔒💕
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
              Yay, {formData.name}!
            </p>
            <p style={{ fontSize: '1.5rem', lineHeight: '1.8' }}>
              I am super excited! Our schedule is locked:
              <br />
              📍 Location: <strong>{formData.location}</strong>
              <br />
              🍔 Cuisine: <strong>{formData.food}</strong>
              <br />
              📅 Time: <strong>{formData.date}</strong> at <strong>{formData.time}</strong>
            </p>
            <div style={{ borderTop: '2px solid var(--card-border)', paddingTop: '2.5rem', marginTop: '2.5rem' }}>
              <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>Response logged successfully. See you soon! 🥰</p>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
