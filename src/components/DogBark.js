'use client';

import { useState, useCallback } from 'react';

const BARKS = [
	{ sound: 'WOOF!', emoji: '🐕', size: '2rem' },
	{ sound: 'BARK!', emoji: '🦴', size: '1.8rem' },
	{ sound: 'ARF!', emoji: '🐾', size: '1.6rem' },
	{ sound: 'BORK!', emoji: '😤', size: '2.2rem' },
	{ sound: 'YIP!', emoji: '🌟', size: '1.5rem' },
	{ sound: 'AWOO!', emoji: '🌙', size: '2rem' },
	{ sound: 'ROWF!', emoji: '💨', size: '1.7rem' },
];

export default function DogBark() {
	const [bubbles, setBubbles] = useState([]);
	const [barkCount, setBarkCount] = useState(0);
	const [shaking, setShaking] = useState(false);
	const nextId = useState(0);

	const handleBark = useCallback(() => {
		const bark = BARKS[Math.floor(Math.random() * BARKS.length)];
		const id = Date.now() + Math.random();
		const x = 20 + Math.random() * 60;
		const y = 10 + Math.random() * 40;

		setBubbles((prev) => [...prev, { id, ...bark, x, y }]);
		setBarkCount((c) => c + 1);
		setShaking(true);
		setTimeout(() => setShaking(false), 400);
		setTimeout(() => {
			setBubbles((prev) => prev.filter((b) => b.id !== id));
		}, 1200);
	}, []);

	return (
		<div className="p-6 bg-yellow-50/80 rounded-xl border-2 border-yellow-400 w-full max-w-xl">
			<style>{`
				@keyframes dogbark-shake {
					0%, 100% { transform: translateX(0) rotate(0deg); }
					20% { transform: translateX(-6px) rotate(-3deg); }
					40% { transform: translateX(6px) rotate(3deg); }
					60% { transform: translateX(-4px) rotate(-2deg); }
					80% { transform: translateX(4px) rotate(2deg); }
				}
				@keyframes dogbark-pop {
					0% { opacity: 0; transform: scale(0.4) translateY(0); }
					30% { opacity: 1; transform: scale(1.15) translateY(-8px); }
					70% { opacity: 1; transform: scale(1) translateY(-16px); }
					100% { opacity: 0; transform: scale(0.8) translateY(-30px); }
				}
				.dogbark-shake { animation: dogbark-shake 0.4s ease-in-out; }
				.dogbark-bubble {
					position: absolute;
					animation: dogbark-pop 1.2s ease-out forwards;
					pointer-events: none;
					font-weight: 900;
					color: #92400e;
					text-shadow: 1px 1px 0 #fde68a, -1px -1px 0 #fde68a;
					white-space: nowrap;
				}
			`}</style>

			<h2 className="text-2xl font-bold text-yellow-900 mb-1 text-center">Dog</h2>
			<p className="text-yellow-700 text-sm text-center mb-4">
				Barked {barkCount} time{barkCount !== 1 ? 's' : ''}
			</p>

			{/* Dog display area */}
			<div
				className="relative flex justify-center items-center mb-6 cursor-pointer select-none"
				style={{ minHeight: 160 }}
				onClick={handleBark}
			>
				{/* Bark bubbles */}
				{bubbles.map((b) => (
					<span
						key={b.id}
						className="dogbark-bubble"
						style={{ left: `${b.x}%`, top: `${b.y}%`, fontSize: b.size }}
					>
						{b.emoji} {b.sound}
					</span>
				))}

				{/* Dog SVG */}
				<div className={shaking ? 'dogbark-shake' : ''}>
					<svg width="130" height="130" viewBox="20 15 110 120" xmlns="http://www.w3.org/2000/svg">
						{/* Body */}
						<ellipse cx="75" cy="100" rx="33" ry="26" fill="#C8A96E" />
						{/* Head */}
						<ellipse cx="75" cy="57" rx="24" ry="22" fill="#C8A96E" />
						{/* Left ear */}
						<ellipse cx="54" cy="44" rx="9" ry="15" fill="#A0784A" transform="rotate(-15 54 44)" />
						{/* Right ear */}
						<ellipse cx="96" cy="44" rx="9" ry="15" fill="#A0784A" transform="rotate(15 96 44)" />
						{/* Snout */}
						<ellipse cx="75" cy="67" rx="13" ry="10" fill="#B8966A" />
						{/* Nose */}
						<ellipse cx="75" cy="61" rx="5.5" ry="4" fill="#2d1a0e" />
						{/* Left eye */}
						<circle cx="64" cy="52" r="5" fill="#2d1a0e" />
						<circle cx="65.5" cy="51" r="1.5" fill="#fff" />
						{/* Right eye */}
						<circle cx="86" cy="52" r="5" fill="#2d1a0e" />
						<circle cx="87.5" cy="51" r="1.5" fill="#fff" />
						{/* Open mouth */}
						<path d="M67 70 Q75 78 83 70" stroke="#2d1a0e" strokeWidth="2" fill="#e879a0" strokeLinecap="round" />
						{/* Tongue */}
						<ellipse cx="75" cy="76" rx="5" ry="6" fill="#e879a0" />
						{/* Tail */}
						<path d="M107 88 Q128 65 122 48" stroke="#A0784A" strokeWidth="8" fill="none" strokeLinecap="round" />
						{/* Front legs */}
						<rect x="58" y="118" width="10" height="20" rx="5" fill="#C8A96E" />
						<rect x="82" y="118" width="10" height="20" rx="5" fill="#C8A96E" />
						{/* Back legs */}
						<ellipse cx="55" cy="110" rx="9" ry="6" fill="#B8966A" />
						<ellipse cx="97" cy="110" rx="9" ry="6" fill="#B8966A" />
					</svg>
				</div>
			</div>

			<button
				onClick={handleBark}
				className="w-full py-3 rounded-xl bg-yellow-400 border-2 border-yellow-600 text-yellow-900 font-bold text-lg active:scale-95 transition-transform select-none hover:bg-yellow-300"
			>
				🐕 Bark!
			</button>
			<p className="text-xs text-yellow-600 text-center mt-2">Tap the dog or press Bark!</p>
		</div>
	);
}
