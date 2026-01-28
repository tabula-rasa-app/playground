'use client';

import { useState, useEffect } from 'react';

export default function GlobalCounter() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [clicking, setClicking] = useState(false);
  const [ripples, setRipples] = useState([]);

  // Fetch initial count
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
    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    // Trigger click animation
    setClicking(true);
    setTimeout(() => setClicking(false), 200);

    // Optimistic update
    setCount(prev => prev + 1);

    try {
      const response = await fetch('/api/counter', {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        setCount(data.value);
      }
    } catch (error) {
      console.error('Error incrementing count:', error);
      // Revert on error
      setCount(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-3xl shadow-2xl max-w-md mx-auto my-8">
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
                        0 0 40px rgba(255, 255, 255, 0.3),
                        0 0 60px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.8),
                        0 0 60px rgba(255, 255, 255, 0.5),
                        0 0 90px rgba(255, 255, 255, 0.3);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        @keyframes count-up {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .float {
          animation: float 3s ease-in-out infinite;
        }

        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          pointer-events: none;
          animation: ripple 0.6s ease-out;
        }

        .count-up {
          animation: count-up 0.2s ease-out;
        }
      `}</style>

      <div className="float">
        <h2 className="text-white text-3xl font-bold mb-2 text-center drop-shadow-lg">
          Global Click Counter
        </h2>
        <p className="text-white/90 text-sm mb-6 text-center">
          Join visitors from around the world!
        </p>
      </div>

      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-6 min-w-[250px]">
        <div className="text-center">
          <div className={`text-6xl font-bold text-white drop-shadow-2xl ${clicking ? 'count-up' : ''}`}>
            {loading ? '...' : count.toLocaleString()}
          </div>
          <div className="text-white/80 text-sm mt-2 uppercase tracking-wider">
            Total Clicks
          </div>
        </div>
      </div>

      <button
        onClick={handleClick}
        disabled={loading}
        className="relative overflow-hidden bg-white text-purple-600 font-bold text-xl px-12 py-4 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed pulse-glow"
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
        <span className="relative z-10">
          Click Me!
        </span>
      </button>

      <p className="text-white/70 text-xs mt-4 text-center">
        Every click from every visitor counts!
      </p>
    </div>
  );
}
