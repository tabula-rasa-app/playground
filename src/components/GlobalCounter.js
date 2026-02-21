'use client';

import { useState, useEffect } from 'react';

export default function GlobalCounter() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [clicking, setClicking] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      const response = await fetch('/api/counter');
      if (response.ok) {
        const data = await response.json();
        setCount(data.value);
      }
    } catch (error) {
      console.error('Error fetching count:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    setClicking(true);
    setTimeout(() => setClicking(false), 200);

    setCount(prev => prev + 1);

    try {
      const response = await fetch('/api/counter', { method: 'POST' });
      if (response.ok) {
        const data = await response.json();
        setCount(data.value);
      }
    } catch (error) {
      console.error('Error incrementing count:', error);
      setCount(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[var(--bg-surface)] rounded-2xl shadow-[var(--shadow-md)] border border-[var(--border-color)] w-full max-w-md mx-auto">
      <style jsx>{`
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }

        @keyframes count-up {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }

        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(124, 111, 205, 0.4);
          pointer-events: none;
          animation: ripple 0.6s ease-out;
        }

        .count-up {
          animation: count-up 0.2s ease-out;
        }
      `}</style>

      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1 text-center">
        Global Click Counter
      </h2>
      <p className="text-sm text-[var(--text-secondary)] mb-5 text-center">
        Join visitors from around the world!
      </p>

      <div className="bg-[var(--bg-surface-2)] rounded-xl px-10 py-6 mb-5 w-full text-center">
        <div className={`text-5xl font-bold text-[var(--text-primary)] ${clicking ? 'count-up' : ''}`}>
          {loading ? '—' : count.toLocaleString()}
        </div>
        <div className="text-xs text-[var(--text-muted)] mt-1 uppercase tracking-widest">
          Total Clicks
        </div>
      </div>

      <button
        onClick={handleClick}
        disabled={loading}
        className="relative overflow-hidden bg-[var(--accent)] hover:opacity-90 text-white font-semibold text-base px-10 py-3 rounded-xl shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transform hover:scale-[1.03] active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed w-full"
      >
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className="ripple"
            style={{
              left: ripple.x - 50,
              top: ripple.y - 50,
              width: 100,
              height: 100,
            }}
          />
        ))}
        <span className="relative z-10">Click Me!</span>
      </button>

      <p className="text-xs text-[var(--text-muted)] mt-3 text-center">
        Every click from every visitor counts!
      </p>
    </div>
  );
}
