'use client';

import { useState, useEffect } from 'react';

export default function VisitorOfTheDay() {
  const [visitorOfTheDay, setVisitorOfTheDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVisitorOfTheDay();
  }, []);

  useEffect(() => {
    if (visitorOfTheDay?.expiresAt) {
      updateTimeRemaining();
      const interval = setInterval(updateTimeRemaining, 60000);
      return () => clearInterval(interval);
    }
  }, [visitorOfTheDay]);

  const updateTimeRemaining = () => {
    if (!visitorOfTheDay?.expiresAt) return;

    const now = new Date();
    const expiresAt = new Date(visitorOfTheDay.expiresAt);
    const diff = expiresAt - now;

    if (diff <= 0) {
      setTimeRemaining('Expired');
      fetchVisitorOfTheDay();
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    setTimeRemaining(`${hours}h ${minutes}m remaining`);
  };

  const fetchVisitorOfTheDay = async () => {
    try {
      const response = await fetch('/api/visitor-of-the-day');
      if (response.ok) {
        const data = await response.json();
        setVisitorOfTheDay(data);
      } else if (response.status === 404) {
        setVisitorOfTheDay(null);
      }
    } catch (error) {
      console.error('Error fetching visitor of the day:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!visitorName.trim()) {
      setError('Please enter your name');
      return;
    }

    setRegistering(true);

    try {
      const response = await fetch('/api/visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: visitorName.trim() }),
      });

      if (response.ok) {
        setVisitorName('');
        setShowRegisterForm(false);
        await fetchVisitorOfTheDay();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to register');
      }
    } catch (error) {
      console.error('Error registering visitor:', error);
      setError('Failed to register. Please try again.');
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 bg-[var(--bg-surface)] rounded-2xl shadow-[var(--shadow-md)] border border-[var(--border-color)] w-full max-w-md mx-auto">
        <div className="text-[var(--text-secondary)] text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-[var(--bg-surface)] rounded-2xl shadow-[var(--shadow-md)] border border-[var(--border-color)] w-full max-w-md mx-auto">
      <style jsx>{`
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
          50% { transform: scale(1.15) rotate(180deg); opacity: 1; }
        }
        .sparkle { animation: sparkle 2s ease-in-out infinite; }
      `}</style>

      <div className="text-center mb-5 w-full">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
          Visitor of the Day
        </h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Featured visitor promoted for 24 hours!
        </p>
        <div className="h-px bg-[var(--border-color)] mt-4" />
      </div>

      {visitorOfTheDay ? (
        <div className="w-full mb-4">
          <div className="bg-[var(--bg-surface-2)] rounded-xl p-6 text-center">
            <div className="text-5xl mb-3 sparkle">👑</div>
            <div className="text-2xl font-bold text-[var(--text-primary)] mb-1">
              {visitorOfTheDay.visitorName}
            </div>
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-3">
              Featured Visitor
            </div>
            <span className="inline-block bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-medium px-3 py-1 rounded-full">
              {timeRemaining}
            </span>
          </div>
          <div className="text-center text-xs text-[var(--text-muted)] mt-2">
            Selected on {new Date(visitorOfTheDay.selectedAt).toLocaleDateString()}
          </div>
        </div>
      ) : (
        <div className="w-full bg-[var(--bg-surface-2)] rounded-xl p-6 mb-4 text-center">
          <div className="text-4xl mb-3">🎯</div>
          <p className="text-sm text-[var(--text-primary)] mb-1">No visitor of the day yet!</p>
          <p className="text-xs text-[var(--text-secondary)]">Be the first to register and get featured!</p>
        </div>
      )}

      {!showRegisterForm ? (
        <button
          onClick={() => setShowRegisterForm(true)}
          className="w-full bg-[var(--accent)] hover:opacity-90 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transform hover:scale-[1.02] active:scale-95 transition-all duration-200"
        >
          Register as Visitor
        </button>
      ) : (
        <form onSubmit={handleRegister} className="w-full space-y-3">
          <input
            type="text"
            value={visitorName}
            onChange={(e) => setVisitorName(e.target.value)}
            placeholder="Enter your name"
            maxLength={50}
            className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-2)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 text-sm"
            disabled={registering}
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={registering}
              className="flex-1 bg-[var(--accent)] hover:opacity-90 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {registering ? 'Registering...' : 'Register'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowRegisterForm(false);
                setError('');
                setVisitorName('');
              }}
              disabled={registering}
              className="px-4 py-2.5 bg-[var(--bg-surface-2)] text-[var(--text-secondary)] font-medium text-sm rounded-xl hover:bg-[var(--border-color)] transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <p className="text-xs text-[var(--text-muted)] mt-3 text-center">
        Register now for a chance to be featured tomorrow!
      </p>
    </div>
  );
}
