'use client';

import { useState, useEffect, useRef } from 'react';

function RobotFigure({ isMining, phase }) {
  return (
    <svg width="80" height="112" viewBox="0 0 80 112" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Antenna */}
      <line x1="40" y1="8" x2="40" y2="0" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="40" cy="0" r="4" fill={isMining ? '#34D399' : '#6366F1'} />
      {/* Head */}
      <rect x="18" y="8" width="44" height="36" rx="10" fill="#374151" stroke="#6366F1" strokeWidth="2" />
      {/* Eyes */}
      <rect x="24" y="16" width="12" height="10" rx="3" fill={isMining ? '#34D399' : '#6B7280'} />
      <rect x="44" y="16" width="12" height="10" rx="3" fill={isMining ? '#34D399' : '#6B7280'} />
      {isMining && <circle cx="30" cy="21" r="3" fill="#6EE7B7" />}
      {isMining && <circle cx="50" cy="21" r="3" fill="#6EE7B7" />}
      {/* Mouth */}
      <rect x="26" y="33" width="28" height="6" rx="3" fill={isMining ? '#34D399' : '#4B5563'} />
      {/* Body */}
      <rect x="12" y="46" width="56" height="38" rx="8" fill="#1F2937" stroke="#4C1D95" strokeWidth="1.5" />
      {/* Chest panel */}
      <rect x="20" y="54" width="40" height="22" rx="4" fill="#0F172A" />
      <circle cx="40" cy="58" r="3" fill={isMining ? '#34D399' : '#374151'} />
      <rect x="24" y="64" width={isMining ? 32 : 10} height="4" rx="2" fill={isMining ? '#34D399' : '#374151'} />
      <rect x="24" y="71" width={isMining ? 20 : 5} height="3" rx="1.5" fill={isMining ? '#6EE7B7' : '#374151'} />
      {/* Left arm */}
      <line
        x1="12" y1="56"
        x2={isMining && phase === 0 ? 0 : 2}
        y2={isMining && phase === 0 ? 70 : 54}
        stroke="#4B5563" strokeWidth="7" strokeLinecap="round"
      />
      {/* Right arm */}
      <line
        x1="68" y1="56"
        x2={isMining && phase === 0 ? 80 : 78}
        y2={isMining && phase === 0 ? 54 : 70}
        stroke="#4B5563" strokeWidth="7" strokeLinecap="round"
      />
      {/* Legs */}
      <line x1="30" y1="84" x2="26" y2="106" stroke="#374151" strokeWidth="10" strokeLinecap="round" />
      <line x1="50" y1="84" x2="54" y2="106" stroke="#374151" strokeWidth="10" strokeLinecap="round" />
      {/* Feet */}
      <ellipse cx="24" cy="108" rx="10" ry="4" fill="#1E3A5F" />
      <ellipse cx="56" cy="108" rx="10" ry="4" fill="#1E3A5F" />
    </svg>
  );
}

export default function AIMiner() {
  const [isMining, setIsMining] = useState(false);
  const [totalTokens, setTotalTokens] = useState(0);
  const [sessionTokens, setSessionTokens] = useState(0);
  const [loading, setLoading] = useState(true);
  const [particles, setParticles] = useState([]);
  const [animPhase, setAnimPhase] = useState(0);

  const mineIntervalRef = useRef(null);
  const saveIntervalRef = useRef(null);
  const animIntervalRef = useRef(null);
  const pendingRef = useRef(0);
  const particleId = useRef(0);

  useEffect(() => {
    fetchTokens();
  }, []);

  // Cleanup on unmount — save any pending tokens
  useEffect(() => {
    return () => {
      clearInterval(mineIntervalRef.current);
      clearInterval(saveIntervalRef.current);
      clearInterval(animIntervalRef.current);
      const pending = pendingRef.current;
      pendingRef.current = 0;
      if (pending > 0) saveTokens(pending);
    };
  }, []);

  const fetchTokens = async () => {
    try {
      const res = await fetch('/api/mined-tokens');
      if (res.ok) {
        const data = await res.json();
        setTotalTokens(data.total);
      }
    } catch (e) {
      console.error('Failed to fetch tokens', e);
    } finally {
      setLoading(false);
    }
  };

  const saveTokens = async (amount) => {
    if (amount <= 0) return;
    try {
      const res = await fetch('/api/mined-tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      if (res.ok) {
        const data = await res.json();
        setTotalTokens(data.total);
      }
    } catch (e) {
      console.error('Failed to save tokens', e);
    }
  };

  const startMining = () => {
    mineIntervalRef.current = setInterval(() => {
      pendingRef.current += 1;
      setSessionTokens((prev) => prev + 1);
      setTotalTokens((prev) => prev + 1);

      const id = particleId.current++;
      const x = 15 + Math.random() * 70;
      const y = 20 + Math.random() * 50;
      setParticles((prev) => [...prev, { id, x, y }]);
      setTimeout(() => setParticles((prev) => prev.filter((p) => p.id !== id)), 1200);
    }, 1000);

    saveIntervalRef.current = setInterval(() => {
      const pending = pendingRef.current;
      pendingRef.current = 0;
      saveTokens(pending);
    }, 10000);

    animIntervalRef.current = setInterval(() => {
      setAnimPhase((p) => (p + 1) % 2);
    }, 500);
  };

  const stopMining = () => {
    clearInterval(mineIntervalRef.current);
    clearInterval(saveIntervalRef.current);
    clearInterval(animIntervalRef.current);

    const pending = pendingRef.current;
    pendingRef.current = 0;
    saveTokens(pending);
  };

  const handleToggle = () => {
    if (isMining) {
      stopMining();
      setIsMining(false);
    } else {
      startMining();
      setIsMining(true);
    }
  };

  return (
    <div
      className="w-full rounded-2xl overflow-hidden shadow-xl"
      style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 55%, #24243e 100%)' }}
    >
      <style jsx>{`
        @keyframes float-up {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-60px); opacity: 0; }
        }
      `}</style>

      {/* Header */}
      <div className="px-5 pt-5 pb-3 text-center">
        <h2 className="text-white text-2xl font-bold tracking-tight">AI Token Miner</h2>
        <p className="text-purple-300 text-sm mt-1">Let AI mine tokens for you automatically</p>
      </div>

      {/* Stats */}
      <div className="flex justify-around px-4 pb-4">
        <div className="text-center">
          <p className="text-white text-2xl font-bold">{loading ? '—' : totalTokens.toLocaleString()}</p>
          <p className="text-purple-300 text-xs">Total Mined</p>
        </div>
        <div className="text-center">
          <p className="text-white text-2xl font-bold">{sessionTokens.toLocaleString()}</p>
          <p className="text-purple-300 text-xs">This Session</p>
        </div>
        <div className="text-center">
          <p className="text-white text-2xl font-bold">1/s</p>
          <p className="text-purple-300 text-xs">Rate</p>
        </div>
      </div>

      {/* Robot + particles */}
      <div className="flex flex-col items-center pb-5 px-4 gap-4">
        <div className="relative flex items-center justify-center w-full" style={{ height: 140 }}>
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute text-yellow-400 text-sm font-bold pointer-events-none select-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                animation: 'float-up 1.2s ease-out forwards',
              }}
            >
              +1
            </span>
          ))}
          <div className={`transition-transform duration-300 ${isMining ? 'scale-110' : 'scale-100'}`}>
            <RobotFigure isMining={isMining} phase={animPhase} />
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isMining ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`} />
          <span className="text-sm text-white font-medium">
            {isMining ? 'Mining in progress...' : 'AI Miner Idle'}
          </span>
        </div>

        {/* Toggle button */}
        <button
          onClick={handleToggle}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-bold text-white text-base transition-all duration-200 active:scale-95 shadow-lg ${
            isMining ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-600 hover:bg-purple-700'
          } disabled:opacity-40 disabled:cursor-not-allowed`}
          style={
            isMining
              ? { boxShadow: '0 0 20px rgba(239,68,68,0.4)' }
              : { boxShadow: '0 0 20px rgba(147,51,234,0.4)' }
          }
        >
          {isMining ? 'Stop Mining' : 'Start Mining'}
        </button>

        <p className="text-purple-400 text-xs text-center">
          Tokens are shared globally and persist across sessions!
        </p>
      </div>
    </div>
  );
}
