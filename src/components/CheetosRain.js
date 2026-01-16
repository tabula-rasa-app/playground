'use client';

import { useEffect, useState } from 'react';

export default function CheetosRain() {
  const [cheetos, setCheetos] = useState([]);

  useEffect(() => {
    // Generate 20 Cheetos with random properties
    const cheetosArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`, // 3-7 seconds
      rotation: Math.random() * 360,
      size: 20 + Math.random() * 20, // 20-40px
    }));
    setCheetos(cheetosArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {cheetos.map((cheeto) => (
        <div
          key={cheeto.id}
          className="absolute -top-20 animate-fall"
          style={{
            left: cheeto.left,
            animationDelay: cheeto.animationDelay,
            animationDuration: cheeto.animationDuration,
          }}
        >
          <div
            className="animate-spin-slow"
            style={{
              animationDuration: '3s',
              animationDelay: cheeto.animationDelay,
            }}
          >
            <span
              style={{
                fontSize: `${cheeto.size}px`,
                display: 'block',
                transform: `rotate(${cheeto.rotation}deg)`,
              }}
            >
              🧀
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
