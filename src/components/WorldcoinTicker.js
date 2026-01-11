'use client';

import { useState, useEffect } from 'react';

export default function WorldcoinTicker() {
  const [holders, setHolders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchHolders = async () => {
    try {
      const response = await fetch('/api/worldcoin-holders');
      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      setHolders(data.holders);
      setError(false);
    } catch (err) {
      console.error('Error fetching holders:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchHolders();

    // Update every 10 seconds for real-time updates
    const interval = setInterval(fetchHolders, 10000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (num === null) return '...';
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-4 shadow-lg">
      <div className="max-w-3xl mx-auto flex items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-pulse"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="6" fill="currentColor" />
          </svg>
          <span className="font-semibold text-sm sm:text-base">Worldcoin Holders:</span>
        </div>
        <div className="flex items-center gap-2">
          {loading && holders === null ? (
            <span className="text-sm sm:text-lg font-mono">Loading...</span>
          ) : error ? (
            <span className="text-sm sm:text-lg font-mono">Unavailable</span>
          ) : (
            <span className="text-lg sm:text-2xl font-bold font-mono tabular-nums">
              {formatNumber(holders)}
            </span>
          )}
          {!loading && !error && (
            <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" title="Live" />
          )}
        </div>
      </div>
    </div>
  );
}
