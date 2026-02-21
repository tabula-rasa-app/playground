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
    fetchHolders();
    const interval = setInterval(fetchHolders, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (num === null) return '...';
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="w-full bg-[var(--bg-surface)] border-b border-[var(--border-color)] py-2 px-4">
      <div className="max-w-3xl mx-auto flex items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[var(--accent)]"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="6" fill="currentColor" />
          </svg>
          <span className="text-xs font-medium text-[var(--text-secondary)]">Worldcoin Holders</span>
        </div>
        <div className="flex items-center gap-2">
          {loading && holders === null ? (
            <span className="text-xs text-[var(--text-muted)] font-mono">Loading...</span>
          ) : error ? (
            <span className="text-xs text-[var(--text-muted)] font-mono">Unavailable</span>
          ) : (
            <span className="text-sm font-bold font-mono tabular-nums text-[var(--text-primary)]">
              {formatNumber(holders)}
            </span>
          )}
          {!loading && !error && (
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Live" />
          )}
        </div>
      </div>
    </div>
  );
}
