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

  // Fetch visitor of the day
  useEffect(() => {
    fetchVisitorOfTheDay();
  }, []);

  // Update time remaining every minute
  useEffect(() => {
    if (visitorOfTheDay?.expiresAt) {
      updateTimeRemaining();
      const interval = setInterval(updateTimeRemaining, 60000); // Update every minute
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
      // Fetch new visitor of the day
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: visitorName.trim() }),
      });

      if (response.ok) {
        setVisitorName('');
        setShowRegisterForm(false);
        // Refresh visitor of the day in case this is the first visitor
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
      <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 rounded-3xl shadow-2xl max-w-md mx-auto my-8">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 rounded-3xl shadow-2xl max-w-md mx-auto my-8">
      <style jsx>{`
        @keyframes shine {
          0%, 100% {
            background-position: -200% center;
          }
          50% {
            background-position: 200% center;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes sparkle {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 1;
          }
        }

        .shine {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 200% auto;
          animation: shine 3s linear infinite;
        }

        .float {
          animation: float 3s ease-in-out infinite;
        }

        .sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
      `}</style>

      <div className="float w-full">
        <div className="text-center mb-6">
          <div className="inline-block">
            <h2 className="text-white text-3xl font-bold mb-2 drop-shadow-lg">
              ⭐ Visitor of the Day ⭐
            </h2>
            <div className="h-1 bg-white/50 rounded-full shine"></div>
          </div>
          <p className="text-white/90 text-sm mt-3">
            Featured visitor promoted for 24 hours!
          </p>
        </div>

        {visitorOfTheDay ? (
          <div className="w-full">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-4">
              <div className="text-center">
                <div className="text-7xl mb-4 sparkle">👑</div>
                <div className="text-4xl font-bold text-white drop-shadow-2xl mb-2">
                  {visitorOfTheDay.visitorName}
                </div>
                <div className="text-white/80 text-sm uppercase tracking-wider mb-4">
                  Featured Visitor
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 inline-block">
                  <div className="text-white/90 text-xs font-semibold">
                    {timeRemaining}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-white/70 text-xs mb-4">
              Selected on {new Date(visitorOfTheDay.selectedAt).toLocaleDateString()}
            </div>
          </div>
        ) : (
          <div className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-4">
            <div className="text-center text-white">
              <div className="text-5xl mb-4">🎯</div>
              <p className="text-lg mb-2">No visitor of the day yet!</p>
              <p className="text-sm text-white/80">Be the first to register and get featured!</p>
            </div>
          </div>
        )}

        {!showRegisterForm ? (
          <button
            onClick={() => setShowRegisterForm(true)}
            className="w-full bg-white text-teal-600 font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Register as Visitor
          </button>
        ) : (
          <form onSubmit={handleRegister} className="w-full space-y-4">
            <div>
              <input
                type="text"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder="Enter your name"
                maxLength={50}
                className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 font-medium"
                disabled={registering}
              />
              {error && (
                <p className="text-red-200 text-sm mt-2">{error}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={registering}
                className="flex-1 bg-white text-teal-600 font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="px-6 py-3 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <p className="text-white/70 text-xs mt-4 text-center">
          Register now for a chance to be featured tomorrow!
        </p>
      </div>
    </div>
  );
}
