'use client';

import { useState, useEffect, useCallback } from 'react';

const CHAMPIONSHIPS = [
  { key: 'world-cup', name: 'Copa do Mundo FIFA', flag: '🌍', region: 'Mundial' },
  { key: 'champions-league', name: 'Champions League', flag: '🏆', region: 'Europa' },
  { key: 'copa-libertadores', name: 'Copa Libertadores', flag: '🌎', region: 'América do Sul' },
  { key: 'premier-league', name: 'Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', region: 'Inglaterra' },
  { key: 'la-liga', name: 'La Liga', flag: '🇪🇸', region: 'Espanha' },
  { key: 'serie-a', name: 'Serie A', flag: '🇮🇹', region: 'Itália' },
  { key: 'bundesliga', name: 'Bundesliga', flag: '🇩🇪', region: 'Alemanha' },
  { key: 'ligue-1', name: 'Ligue 1', flag: '🇫🇷', region: 'França' },
  { key: 'brasileirao', name: 'Brasileirão Série A', flag: '🇧🇷', region: 'Brasil' },
  { key: 'mls', name: 'MLS', flag: '🇺🇸', region: 'EUA' },
  { key: 'afc-champions', name: 'AFC Champions', flag: '🌏', region: 'Ásia' },
  { key: 'africa-cup', name: 'CAN Africa Cup', flag: '🌍', region: 'África' },
];

export default function GoalCounter() {
  const [goals, setGoals] = useState({});
  const [loading, setLoading] = useState(true);
  const [scoring, setScoring] = useState({});
  const [floaters, setFloaters] = useState([]);

  const fetchGoals = useCallback(async () => {
    try {
      const res = await fetch('/api/goals');
      if (res.ok) {
        const data = await res.json();
        const map = {};
        data.forEach((item) => { map[item.championship] = item.goals; });
        setGoals(map);
      }
    } catch (err) {
      console.error('Error fetching goals:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const totalGoals = Object.values(goals).reduce((sum, v) => sum + v, 0);

  const handleGoal = async (key) => {
    setGoals((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + 1 }));
    setScoring((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setScoring((prev) => ({ ...prev, [key]: false })), 400);

    const id = Date.now() + Math.random();
    setFloaters((prev) => [...prev, { id, key }]);
    setTimeout(() => setFloaters((prev) => prev.filter((f) => f.id !== id)), 900);

    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ championship: key }),
      });
      if (res.ok) {
        const data = await res.json();
        setGoals((prev) => ({ ...prev, [data.championship]: data.goals }));
      }
    } catch (err) {
      console.error('Error recording goal:', err);
      setGoals((prev) => ({ ...prev, [key]: Math.max(0, (prev[key] ?? 1) - 1) }));
    }
  };

  return (
    <div className="flex flex-col bg-[var(--bg-surface)] rounded-2xl shadow-[var(--shadow-md)] border border-[var(--border-color)] w-full max-w-md mx-auto overflow-hidden">
      <style jsx>{`
        @keyframes floatUp {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-48px) scale(1.6); }
        }
        @keyframes pop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.25); }
          100% { transform: scale(1); }
        }
        @keyframes goalPulse {
          0%   { background-color: var(--accent-soft); }
          100% { background-color: transparent; }
        }
        .float-ball {
          position: absolute;
          pointer-events: none;
          font-size: 1.2rem;
          animation: floatUp 0.9s ease-out forwards;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .pop {
          animation: pop 0.4s ease-out;
        }
        .goal-row-flash {
          animation: goalPulse 0.4s ease-out;
        }
      `}</style>

      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-[var(--border-color)]">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] text-center">
          ⚽ Contador de Gols
        </h2>
        <p className="text-xs text-[var(--text-secondary)] text-center mt-1">
          Campeonatos de futebol ao redor do mundo
        </p>

        {/* Total */}
        <div className="mt-4 bg-[var(--bg-surface-2)] rounded-xl py-3 px-4 flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--text-secondary)]">Total de gols</span>
          <span className="text-2xl font-bold text-[var(--accent)]">
            {loading ? '—' : totalGoals.toLocaleString('pt-BR')}
          </span>
        </div>
      </div>

      {/* Championship list */}
      <div className="divide-y divide-[var(--border-color)]">
        {CHAMPIONSHIPS.map((champ) => {
          const count = goals[champ.key] ?? 0;
          const isScoring = scoring[champ.key];
          const champFloaters = floaters.filter((f) => f.key === champ.key);

          return (
            <div
              key={champ.key}
              className={`flex items-center gap-3 px-4 py-3 ${isScoring ? 'goal-row-flash' : ''}`}
            >
              {/* Flag + info */}
              <span className="text-2xl flex-shrink-0">{champ.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[var(--text-primary)] truncate">
                  {champ.name}
                </div>
                <div className="text-xs text-[var(--text-muted)]">{champ.region}</div>
              </div>

              {/* Goal count */}
              <div className={`text-lg font-bold text-[var(--text-primary)] w-10 text-right flex-shrink-0 ${isScoring ? 'pop' : ''}`}>
                {loading ? '—' : count.toLocaleString('pt-BR')}
              </div>

              {/* Button */}
              <div className="relative flex-shrink-0">
                {champFloaters.map((f) => (
                  <span key={f.id} className="float-ball">⚽</span>
                ))}
                <button
                  onClick={() => handleGoal(champ.key)}
                  disabled={loading}
                  className="bg-[var(--accent)] hover:opacity-90 active:scale-90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-[var(--shadow-sm)] transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Gol!
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-[var(--text-muted)] text-center py-3 px-4">
        Marque um gol ⚽ no seu campeonato favorito!
      </p>
    </div>
  );
}
