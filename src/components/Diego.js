'use client';

import { useState, useCallback, useRef } from 'react';

const QUIPS = [
	{ text: 'Screen limpio!', emoji: '✨', color: '#0369a1' },
	{ text: 'Todo despejado!', emoji: '🧹', color: '#047857' },
	{ text: 'Como nuevo!', emoji: '💫', color: '#7c3aed' },
	{ text: 'Sin mancha!', emoji: '🫧', color: '#0891b2' },
	{ text: 'Dejame limpiar!', emoji: '🧽', color: '#b45309' },
	{ text: 'Diego al rescate!', emoji: '🦸', color: '#dc2626' },
];

export default function Diego() {
	const [wipes, setWipes] = useState([]);
	const [bubbles, setBubbles] = useState([]);
	const [sweeping, setSweeping] = useState(false);
	const [wipeCover, setWipeCover] = useState(false);
	const [cleanCount, setCleanCount] = useState(0);
	const screenRef = useRef(null);

	const spawnBubble = useCallback((quip) => {
		const id = Date.now() + Math.random();
		const x = 10 + Math.random() * 60;
		const y = 5 + Math.random() * 30;
		setBubbles((prev) => [...prev, { id, ...quip, x, y }]);
		setTimeout(() => {
			setBubbles((prev) => prev.filter((b) => b.id !== id));
		}, 1400);
	}, []);

	const handleWipe = useCallback(() => {
		const quip = QUIPS[Math.floor(Math.random() * QUIPS.length)];
		spawnBubble(quip);
		setSweeping(true);
		setWipeCover(true);
		setCleanCount((c) => c + 1);

		// Add smear marks then clear them
		const newWipes = Array.from({ length: 5 }, (_, i) => ({
			id: Date.now() + i,
			x: Math.random() * 80,
			y: 20 + Math.random() * 60,
			w: 30 + Math.random() * 50,
			angle: -10 + Math.random() * 20,
		}));
		setWipes(newWipes);

		setTimeout(() => {
			setWipes([]);
			setWipeCover(false);
		}, 600);

		setTimeout(() => setSweeping(false), 500);
	}, [spawnBubble]);

	return (
		<div className="p-6 bg-sky-50/80 rounded-xl border-2 border-sky-300 w-full max-w-xl">
			<style>{`
				@keyframes diego-sweep {
					0%   { transform: rotate(-8deg) translateX(-8px); }
					30%  { transform: rotate(10deg) translateX(8px); }
					60%  { transform: rotate(-5deg) translateX(-4px); }
					100% { transform: rotate(0deg) translateX(0); }
				}
				@keyframes diego-pop {
					0%   { opacity: 0; transform: scale(0.3) translateY(0); }
					25%  { opacity: 1; transform: scale(1.2) translateY(-6px); }
					70%  { opacity: 1; transform: scale(1) translateY(-18px); }
					100% { opacity: 0; transform: scale(0.7) translateY(-36px); }
				}
				@keyframes diego-wipe-in {
					0%   { opacity: 0.7; transform: scaleX(0) rotate(var(--angle)); }
					50%  { opacity: 0.5; transform: scaleX(1) rotate(var(--angle)); }
					100% { opacity: 0; transform: scaleX(1.1) rotate(var(--angle)); }
				}
				@keyframes diego-flash {
					0%, 100% { opacity: 0; }
					40%       { opacity: 0.18; }
				}
				.diego-sweep { animation: diego-sweep 0.5s ease-in-out; }
				.diego-bubble {
					position: absolute;
					animation: diego-pop 1.4s ease-out forwards;
					pointer-events: none;
					font-weight: 800;
					white-space: nowrap;
					text-shadow: 1px 1px 0 #bae6fd, -1px -1px 0 #bae6fd;
				}
				.diego-smear {
					position: absolute;
					height: 12px;
					border-radius: 6px;
					background: rgba(186,230,253,0.7);
					transform-origin: left center;
					animation: diego-wipe-in 0.6s ease-out forwards;
				}
				.diego-flash {
					position: absolute;
					inset: 0;
					background: white;
					border-radius: 12px;
					pointer-events: none;
					animation: diego-flash 0.6s ease-out forwards;
				}
			`}</style>

			<h2 className="text-2xl font-bold text-sky-900 mb-1 text-center">Diego</h2>
			<p className="text-sky-600 text-sm text-center mb-4">
				Pantallas limpiadas: {cleanCount} {cleanCount >= 5 ? '— ¡Eres un pro!' : '— ¡Dale, limpia más!'}
			</p>

			{/* Screen area */}
			<div
				ref={screenRef}
				className="relative flex justify-center items-center mb-5 cursor-pointer select-none rounded-xl overflow-hidden border-2 border-sky-200 bg-white/60"
				style={{ minHeight: 180 }}
				onClick={handleWipe}
			>
				{wipeCover && <div className="diego-flash" />}

				{/* Smear marks */}
				{wipes.map((w) => (
					<div
						key={w.id}
						className="diego-smear"
						style={{
							left: `${w.x}%`,
							top: `${w.y}%`,
							width: `${w.w}%`,
							'--angle': `${w.angle}deg`,
						}}
					/>
				))}

				{/* Bubbles */}
				{bubbles.map((b) => (
					<span
						key={b.id}
						className="diego-bubble"
						style={{ left: `${b.x}%`, top: `${b.y}%`, fontSize: '1.05rem', color: b.color }}
					>
						{b.emoji} {b.text}
					</span>
				))}

				{/* Diego character SVG */}
				<div className={sweeping ? 'diego-sweep' : ''}>
					<svg width="145" height="170" viewBox="0 0 145 170" xmlns="http://www.w3.org/2000/svg">
						{/* Mop handle */}
						<rect x="100" y="50" width="6" height="90" rx="3" fill="#a16207" />
						{/* Mop head */}
						<rect x="88" y="135" width="30" height="10" rx="4" fill="#7dd3fc" />
						<line x1="90" y1="145" x2="90" y2="158" stroke="#7dd3fc" strokeWidth="4" strokeLinecap="round" />
						<line x1="96" y1="145" x2="95" y2="160" stroke="#7dd3fc" strokeWidth="4" strokeLinecap="round" />
						<line x1="102" y1="145" x2="102" y2="161" stroke="#7dd3fc" strokeWidth="4" strokeLinecap="round" />
						<line x1="108" y1="145" x2="109" y2="160" stroke="#7dd3fc" strokeWidth="4" strokeLinecap="round" />
						<line x1="114" y1="145" x2="115" y2="158" stroke="#7dd3fc" strokeWidth="4" strokeLinecap="round" />

						{/* Body */}
						<rect x="30" y="82" width="68" height="60" rx="14" fill="#0ea5e9" />
						{/* Overalls bib */}
						<rect x="44" y="82" width="40" height="28" rx="8" fill="#0284c7" />
						{/* Overalls pocket */}
						<rect x="52" y="88" width="14" height="12" rx="3" fill="#0369a1" />

						{/* Head */}
						<ellipse cx="66" cy="56" rx="28" ry="27" fill="#fcd34d" />
						{/* Hair */}
						<ellipse cx="66" cy="31" rx="25" ry="11" fill="#1c1917" />
						<rect x="41" y="29" width="50" height="15" rx="7" fill="#1c1917" />
						{/* Cap bill */}
						<rect x="38" y="33" width="20" height="7" rx="3" fill="#1c1917" />

						{/* Ears */}
						<ellipse cx="39" cy="56" rx="7" ry="8" fill="#fcd34d" />
						<ellipse cx="93" cy="56" rx="7" ry="8" fill="#fcd34d" />

						{/* Eyes — determined look */}
						<ellipse cx="57" cy="54" rx="5" ry="5" fill="#1c1917" />
						<ellipse cx="76" cy="54" rx="5" ry="5" fill="#1c1917" />
						<circle cx="58.5" cy="52.5" r="1.5" fill="#fff" />
						<circle cx="77.5" cy="52.5" r="1.5" fill="#fff" />
						{/* Focused brows */}
						<path d="M51 46 Q57 43 63 46" stroke="#1c1917" strokeWidth="2.5" fill="none" strokeLinecap="round" />
						<path d="M70 46 Q76 43 82 46" stroke="#1c1917" strokeWidth="2.5" fill="none" strokeLinecap="round" />
						{/* Confident smile */}
						<path d="M57 66 Q66 73 76 66" stroke="#b45309" strokeWidth="2.5" fill="none" strokeLinecap="round" />

						{/* Left arm (reaching out to mop) */}
						<rect x="94" y="84" width="26" height="10" rx="5" fill="#0ea5e9" transform="rotate(-30 94 84)" />
						{/* Right arm (relaxed) */}
						<rect x="12" y="88" width="22" height="10" rx="5" fill="#0ea5e9" />

						{/* Legs */}
						<rect x="39" y="138" width="20" height="26" rx="8" fill="#0ea5e9" />
						<rect x="69" y="138" width="20" height="26" rx="8" fill="#0ea5e9" />
						{/* Shoes */}
						<ellipse cx="49" cy="163" rx="13" ry="6" fill="#1c1917" />
						<ellipse cx="79" cy="163" rx="13" ry="6" fill="#1c1917" />

						{/* Sparkle */}
						<text x="14" y="72" fontSize="16">✨</text>
					</svg>
				</div>
			</div>

			{/* Button */}
			<button
				onClick={handleWipe}
				className="w-full py-3 rounded-xl bg-sky-400 border-2 border-sky-600 text-sky-900 font-bold text-base active:scale-95 transition-transform select-none hover:bg-sky-300"
			>
				🧹 ¡Diego, limpia!
			</button>
			<p className="text-xs text-sky-500 text-center mt-2">Tap a Diego o el botón para limpiar la pantalla!</p>
		</div>
	);
}
