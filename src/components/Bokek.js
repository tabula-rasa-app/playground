'use client';

import { useState, useCallback } from 'react';

const REACTIONS = [
	{ text: 'Dompet kosong!', emoji: '👛', color: '#b45309' },
	{ text: 'Kantong bolong...', emoji: '🕳️', color: '#7c3aed' },
	{ text: 'Makan angin aja', emoji: '💨', color: '#0369a1' },
	{ text: 'Bokek parah!', emoji: '😭', color: '#dc2626' },
	{ text: 'Gaji kapan ya?', emoji: '📅', color: '#047857' },
	{ text: 'Cari receh dulu', emoji: '🪙', color: '#d97706' },
];

export default function Bokek() {
	const [coins, setCoins] = useState(0);
	const [bubbles, setBubbles] = useState([]);
	const [shaking, setShaking] = useState(false);
	const [found, setFound] = useState(false);

	const handlePocketTap = useCallback(() => {
		const reaction = REACTIONS[Math.floor(Math.random() * REACTIONS.length)];
		const id = Date.now() + Math.random();
		const x = 15 + Math.random() * 55;
		const y = 5 + Math.random() * 35;

		setBubbles((prev) => [...prev, { id, ...reaction, x, y }]);
		setShaking(true);
		setFound(false);
		setTimeout(() => setShaking(false), 400);
		setTimeout(() => {
			setBubbles((prev) => prev.filter((b) => b.id !== id));
		}, 1400);
	}, []);

	const handleFindCoin = useCallback(() => {
		setCoins((c) => c + 1);
		const id = Date.now() + Math.random();
		setBubbles((prev) => [
			...prev,
			{ id, text: '+1 receh!', emoji: '🪙', color: '#d97706', x: 30 + Math.random() * 30, y: 10 },
		]);
		setFound(true);
		setTimeout(() => setFound(false), 600);
		setTimeout(() => {
			setBubbles((prev) => prev.filter((b) => b.id !== id));
		}, 1200);
	}, []);

	const isBroke = coins < 5;

	return (
		<div className="p-6 bg-orange-50/80 rounded-xl border-2 border-orange-300 w-full max-w-xl">
			<style>{`
				@keyframes bokek-shake {
					0%, 100% { transform: translateX(0) rotate(0deg); }
					20% { transform: translateX(-5px) rotate(-4deg); }
					40% { transform: translateX(5px) rotate(4deg); }
					60% { transform: translateX(-3px) rotate(-2deg); }
					80% { transform: translateX(3px) rotate(2deg); }
				}
				@keyframes bokek-pop {
					0% { opacity: 0; transform: scale(0.3) translateY(0); }
					25% { opacity: 1; transform: scale(1.2) translateY(-6px); }
					70% { opacity: 1; transform: scale(1) translateY(-18px); }
					100% { opacity: 0; transform: scale(0.7) translateY(-36px); }
				}
				@keyframes bokek-coin-bounce {
					0%, 100% { transform: scale(1); }
					50% { transform: scale(1.3); }
				}
				.bokek-shake { animation: bokek-shake 0.4s ease-in-out; }
				.bokek-bubble {
					position: absolute;
					animation: bokek-pop 1.4s ease-out forwards;
					pointer-events: none;
					font-weight: 800;
					white-space: nowrap;
					text-shadow: 1px 1px 0 #fed7aa, -1px -1px 0 #fed7aa;
				}
				.bokek-coin-found { animation: bokek-coin-bounce 0.5s ease-in-out; }
			`}</style>

			<h2 className="text-2xl font-bold text-orange-900 mb-1 text-center">Bokek</h2>
			<p className="text-orange-600 text-sm text-center mb-4">
				{isBroke
					? `Receh terkumpul: ${coins} 🪙 — masih bokek!`
					: `Receh terkumpul: ${coins} 🪙 — lumayan, bisa beli gorengan!`}
			</p>

			{/* Character area */}
			<div
				className="relative flex justify-center items-center mb-5 cursor-pointer select-none"
				style={{ minHeight: 170 }}
				onClick={handlePocketTap}
			>
				{/* Bubbles */}
				{bubbles.map((b) => (
					<span
						key={b.id}
						className="bokek-bubble"
						style={{ left: `${b.x}%`, top: `${b.y}%`, fontSize: '1.1rem', color: b.color }}
					>
						{b.emoji} {b.text}
					</span>
				))}

				{/* Sad broke character SVG */}
				<div className={shaking ? 'bokek-shake' : ''}>
					<svg width="140" height="165" viewBox="0 0 140 165" xmlns="http://www.w3.org/2000/svg">
						{/* Body */}
						<rect x="38" y="78" width="64" height="58" rx="14" fill="#fb923c" />
						{/* Head */}
						<ellipse cx="70" cy="54" rx="28" ry="26" fill="#fdba74" />
						{/* Hair */}
						<ellipse cx="70" cy="30" rx="26" ry="10" fill="#92400e" />
						<rect x="44" y="28" width="52" height="14" rx="7" fill="#92400e" />
						{/* Left ear */}
						<ellipse cx="43" cy="54" rx="7" ry="8" fill="#fdba74" />
						{/* Right ear */}
						<ellipse cx="97" cy="54" rx="7" ry="8" fill="#fdba74" />
						{/* Sad eyes */}
						<ellipse cx="60" cy="52" rx="5" ry="5.5" fill="#1c1917" />
						<ellipse cx="80" cy="52" rx="5" ry="5.5" fill="#1c1917" />
						<circle cx="61.5" cy="50.5" r="1.5" fill="#fff" />
						<circle cx="81.5" cy="50.5" r="1.5" fill="#fff" />
						{/* Sad eyebrows */}
						<path d="M54 44 Q60 47 66 44" stroke="#92400e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
						<path d="M74 44 Q80 47 86 44" stroke="#92400e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
						{/* Sad mouth */}
						<path d="M60 65 Q70 60 80 65" stroke="#92400e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
						{/* Tear */}
						<ellipse cx="57" cy="60" rx="2" ry="3" fill="#7dd3fc" opacity="0.8" />
						{/* Arms */}
						<rect x="16" y="82" width="24" height="10" rx="5" fill="#fb923c" />
						<rect x="100" y="82" width="24" height="10" rx="5" fill="#fb923c" />
						{/* Empty pocket (left) */}
						<rect x="42" y="100" width="20" height="18" rx="4" fill="#ea580c" />
						<ellipse cx="52" cy="100" rx="8" ry="4" fill="#c2410c" />
						{/* Empty pocket (right) */}
						<rect x="78" y="100" width="20" height="18" rx="4" fill="#ea580c" />
						<ellipse cx="88" cy="100" rx="8" ry="4" fill="#c2410c" />
						{/* Legs */}
						<rect x="47" y="132" width="18" height="26" rx="8" fill="#fb923c" />
						<rect x="75" y="132" width="18" height="26" rx="8" fill="#fb923c" />
						{/* Shoes */}
						<ellipse cx="56" cy="158" rx="12" ry="6" fill="#7c2d12" />
						<ellipse cx="84" cy="158" rx="12" ry="6" fill="#7c2d12" />
						{/* Empty wallet */}
						<rect x="100" y="86" width="22" height="14" rx="4" fill="#854d0e" transform="rotate(-20 100 86)" />
						<line x1="104" y1="89" x2="118" y2="83" stroke="#a16207" strokeWidth="1.5" />
					</svg>
				</div>
			</div>

			{/* Buttons */}
			<div className="flex gap-3">
				<button
					onClick={handlePocketTap}
					className="flex-1 py-3 rounded-xl bg-orange-400 border-2 border-orange-600 text-orange-900 font-bold text-base active:scale-95 transition-transform select-none hover:bg-orange-300"
				>
					👛 Cek Dompet
				</button>
				<button
					onClick={handleFindCoin}
					className={`flex-1 py-3 rounded-xl border-2 font-bold text-base active:scale-95 transition-transform select-none ${
						found
							? 'bg-yellow-300 border-yellow-500 text-yellow-900 bokek-coin-found'
							: 'bg-yellow-100 border-yellow-400 text-yellow-800 hover:bg-yellow-200'
					}`}
				>
					🪙 Cari Receh
				</button>
			</div>
			<p className="text-xs text-orange-500 text-center mt-2">Tap karakter atau tombol di bawah!</p>
		</div>
	);
}
