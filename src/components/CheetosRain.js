'use client';

export default function CheetosRain() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Calm morning sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-orange-50 to-pink-50"></div>

      {/* Soft sun glow */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-200 rounded-full opacity-40 blur-3xl animate-pulse-slow"></div>

      {/* Gentle clouds */}
      <div className="absolute top-20 left-10 w-40 h-12 bg-white rounded-full opacity-30 animate-float-slow"></div>
      <div className="absolute top-32 right-32 w-48 h-14 bg-white rounded-full opacity-25 animate-float-slower"></div>
      <div className="absolute top-48 left-1/3 w-36 h-10 bg-white rounded-full opacity-20 animate-float-slow"></div>
    </div>
  );
}
