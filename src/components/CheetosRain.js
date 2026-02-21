'use client';

export default function CheetosRain() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Light mode: calm morning sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-orange-50/60 to-pink-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/50 transition-colors duration-500" />

      {/* Soft ambient glow */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-yellow-200/30 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" />

      {/* Gentle clouds (light mode only) / Stars (dark mode via opacity) */}
      <div className="absolute top-20 left-10 w-40 h-10 bg-white/40 dark:bg-white/5 rounded-full blur-xl animate-float-slow" />
      <div className="absolute top-32 right-32 w-48 h-12 bg-white/30 dark:bg-white/3 rounded-full blur-xl animate-float-slower" />
      <div className="absolute top-48 left-1/3 w-36 h-8 bg-white/25 dark:bg-white/3 rounded-full blur-xl animate-float-slow" />
    </div>
  );
}
