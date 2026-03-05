'use client';

import { useState, useEffect, useRef } from 'react';

const DOGE_PHRASES = [
	'much wow',
	'very happy',
	'such doge',
	'many treat',
	'so excite',
	'very floof',
	'wow',
	'much shibe',
	'very bork',
	'so friend',
];

function ShibaSVG({ mood, wagging, blinking, tongue }) {
	const eyeRy = blinking ? 1 : 4;

	// Curly tail path for Shiba
	const tailPath = wagging
		? 'M108 92 Q130 70 122 48 Q118 38 110 42'
		: 'M108 95 Q126 78 120 58 Q116 48 108 52';

	return (
		<svg
			width="160"
			height="170"
			viewBox="28 18 96 138"
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Shiba Inu"
		>
			{/* Body - orange/red fur */}
			<ellipse cx="75" cy="102" rx="32" ry="27" fill="#D2691E" />
			{/* Cream belly */}
			<ellipse cx="75" cy="108" rx="18" ry="16" fill="#FFF5E0" />
			{/* Head */}
			<ellipse cx="75" cy="58" rx="24" ry="22" fill="#D2691E" />
			{/* Cream face markings */}
			<ellipse cx="75" cy="66" rx="14" ry="11" fill="#FFF5E0" />
			{/* Left ear - pointed/triangular for Shiba */}
			<polygon points="54,38 48,18 66,34" fill="#D2691E" />
			<polygon points="57,36 52,22 63,33" fill="#C0392B" />
			{/* Right ear */}
			<polygon points="96,38 102,18 84,34" fill="#D2691E" />
			<polygon points="93,36 98,22 87,33" fill="#C0392B" />
			{/* Snout */}
			<ellipse cx="75" cy="67" rx="11" ry="8" fill="#FFF5E0" />
			{/* Nose */}
			<ellipse cx="75" cy="62" rx="5" ry="3.5" fill="#1a0a00" />
			{/* Nose shine */}
			<ellipse cx="73" cy="61" rx="1.5" ry="1" fill="#555" />
			{/* Left eye */}
			<ellipse cx="63" cy="53" rx="5" ry={eyeRy} fill="#1a0a00" />
			<circle cx="64.5" cy="51.5" r="1.5" fill="#fff" />
			{/* Right eye */}
			<ellipse cx="87" cy="53" rx="5" ry={eyeRy} fill="#1a0a00" />
			<circle cx="88.5" cy="51.5" r="1.5" fill="#fff" />
			{/* Eyebrow marks (Shiba has expressive brows) */}
			<ellipse cx="63" cy="46" rx="5" ry="2" fill="#8B3A0A" opacity="0.6" />
			<ellipse cx="87" cy="46" rx="5" ry="2" fill="#8B3A0A" opacity="0.6" />
			{/* Mouth */}
			<path d="M70 72 Q75 76 80 72" stroke="#1a0a00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
			{/* Tongue */}
			{tongue && (
				<ellipse cx="75" cy="76" rx="5" ry="6" fill="#e879a0" />
			)}
			{/* Curly tail - Shiba's signature */}
			<path
				d={tailPath}
				stroke="#A0522D"
				strokeWidth="9"
				fill="none"
				strokeLinecap="round"
			/>
			<path
				d={tailPath}
				stroke="#D2691E"
				strokeWidth="6"
				fill="none"
				strokeLinecap="round"
			/>
			{/* Front left leg */}
			<rect x="58" y="122" width="10" height="22" rx="5" fill="#D2691E" />
			{/* Front right leg */}
			<rect x="82" y="122" width="10" height="22" rx="5" fill="#D2691E" />
			{/* Back leg hints */}
			<ellipse cx="56" cy="114" rx="9" ry="6" fill="#C0722A" />
			<ellipse cx="96" cy="114" rx="9" ry="6" fill="#C0722A" />
			{/* Paws */}
			<ellipse cx="63" cy="143" rx="6" ry="4" fill="#FFF5E0" />
			<ellipse cx="87" cy="143" rx="6" ry="4" fill="#FFF5E0" />

			{/* Mood indicators */}
			{mood === 'excited' && (
				<>
					<text x="34" y="34" fontSize="10">✨</text>
					<text x="108" y="34" fontSize="10">✨</text>
				</>
			)}
			{mood === 'stubborn' && (
				<text x="96" y="38" fontSize="9">😤</text>
			)}
			{mood === 'sleepy' && (
				<text x="96" y="36" fontSize="9">💤</text>
			)}
		</svg>
	);
}

function DogeWord({ text, x, y, color }) {
	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				color,
				fontFamily: 'Comic Sans MS, cursive',
				fontSize: '0.85rem',
				fontWeight: 'bold',
				pointerEvents: 'none',
				userSelect: 'none',
				textShadow: '1px 1px 0 rgba(0,0,0,0.2)',
				whiteSpace: 'nowrap',
			}}
		>
			{text}
		</div>
	);
}

const DOGE_COLORS = ['#e74c3c', '#e67e22', '#2ecc71', '#3498db', '#9b59b6', '#f39c12'];

export default function ShibaInu() {
	const [happiness, setHappiness] = useState(75);
	const [hunger, setHunger] = useState(40);
	const [energy, setEnergy] = useState(85);
	const [mood, setMood] = useState('happy');
	const [wagging, setWagging] = useState(false);
	const [blinking, setBlinking] = useState(false);
	const [tongue, setTongue] = useState(false);
	const [message, setMessage] = useState('Such Shiba. Very hello. Wow.');
	const [dogeWords, setDogeWords] = useState([]);
	const [stubborn, setStubborn] = useState(false);
	const dogeId = useRef(0);
	const wagInterval = useRef(null);
	const blinkInterval = useRef(null);
	const decayInterval = useRef(null);

	useEffect(() => {
		if (energy < 20) setMood('sleepy');
		else if (stubborn) setMood('stubborn');
		else if (hunger > 80) setMood('hungry');
		else if (happiness > 88) setMood('excited');
		else setMood('happy');
	}, [happiness, hunger, energy, stubborn]);

	// Tail wag
	useEffect(() => {
		clearInterval(wagInterval.current);
		if (mood === 'happy' || mood === 'excited') {
			wagInterval.current = setInterval(() => {
				setWagging((w) => !w);
			}, mood === 'excited' ? 180 : 380);
		} else {
			setWagging(false);
		}
		return () => clearInterval(wagInterval.current);
	}, [mood]);

	// Blink
	useEffect(() => {
		const scheduleBlink = () => {
			const delay = 2500 + Math.random() * 3500;
			blinkInterval.current = setTimeout(() => {
				setBlinking(true);
				setTimeout(() => setBlinking(false), 140);
				scheduleBlink();
			}, delay);
		};
		scheduleBlink();
		return () => clearTimeout(blinkInterval.current);
	}, []);

	// Stat decay
	useEffect(() => {
		decayInterval.current = setInterval(() => {
			setHappiness((h) => Math.max(0, h - 1));
			setHunger((h) => Math.min(100, h + 1.2));
			setEnergy((e) => Math.max(0, e - 0.6));
		}, 5000);
		return () => clearInterval(decayInterval.current);
	}, []);

	const spawnDogeWords = (phrases, count = 3) => {
		const chosen = [...phrases].sort(() => Math.random() - 0.5).slice(0, count);
		const words = chosen.map((text, i) => ({
			id: dogeId.current++,
			text,
			x: 10 + Math.random() * 120,
			y: 5 + i * 30 + Math.random() * 15,
			color: DOGE_COLORS[Math.floor(Math.random() * DOGE_COLORS.length)],
		}));
		setDogeWords((prev) => [...prev, ...words]);
		setTimeout(() => {
			setDogeWords((prev) =>
				prev.filter((w) => !words.find((n) => n.id === w.id))
			);
		}, 1800);
	};

	const handlePet = () => {
		// Shiba might be stubborn sometimes
		if (Math.random() < 0.25) {
			setStubborn(true);
			setMessage('Shibe does not want pet right now. Very no.');
			setTimeout(() => setStubborn(false), 2000);
			spawnDogeWords(['much nope', 'very no', 'wow rude'], 2);
			return;
		}
		setHappiness((h) => Math.min(100, h + 14));
		setMood('excited');
		setTongue(true);
		setTimeout(() => setTongue(false), 900);
		setMessage('Much pet. Very love. Wow!');
		spawnDogeWords(['such happy', 'very wow', 'much love', 'so pet'], 3);
		setTimeout(() => setMessage(getIdleMessage()), 2500);
	};

	const handleTreat = () => {
		if (hunger < 8) {
			setMessage('Such full. Cannot eat. Many no.');
			spawnDogeWords(['very full', 'wow no'], 2);
			return;
		}
		setHunger((h) => Math.max(0, h - 35));
		setHappiness((h) => Math.min(100, h + 10));
		setEnergy((e) => Math.min(100, e + 12));
		setTongue(true);
		setTimeout(() => setTongue(false), 800);
		setMessage('Much treat! Very yum! Such nom!');
		spawnDogeWords(['much nom', 'very yum', 'so treat', 'wow snack'], 4);
		setTimeout(() => setMessage(getIdleMessage()), 2500);
	};

	const handleBork = () => {
		setHappiness((h) => Math.min(100, h + 8));
		setEnergy((e) => Math.max(0, e - 10));
		setMood('excited');
		setMessage('BORK BORK BORK! Such loud! Very bork!');
		spawnDogeWords(['BORK', 'bork bork', 'very loud', 'much bork', 'wow'], 5);
		setTimeout(() => setMessage(getIdleMessage()), 2500);
	};

	const getIdleMessage = () => {
		if (energy < 20) return 'Many sleep. Very tired. Zzzz...';
		if (hunger > 80) return 'Such hungry. Where treat? Much want.';
		if (happiness > 88) return 'Very happy! Best day! Much wow!';
		return 'Such Shiba. Very exist. Wow.';
	};

	const statColor = (val) => {
		if (val > 66) return '#22c55e';
		if (val > 33) return '#f59e0b';
		return '#ef4444';
	};

	const hungerColor = (val) => {
		if (val < 33) return '#22c55e';
		if (val < 66) return '#f59e0b';
		return '#ef4444';
	};

	const moodLabel = {
		happy: { emoji: '🐕', label: 'Much happy' },
		excited: { emoji: '🤩', label: 'Very excite!' },
		sleepy: { emoji: '😴', label: 'Many sleep' },
		stubborn: { emoji: '😤', label: 'Such stubborn' },
		hungry: { emoji: '😋', label: 'Very hungry' },
	};

	return (
		<div className="p-6 bg-orange-50/80 rounded-xl border-2 border-orange-300 w-full max-w-xl">
			<style>{`
				@keyframes shiba-bounce {
					0%, 100% { transform: translateY(0); }
					50% { transform: translateY(-10px); }
				}
				@keyframes shiba-word-float {
					0% { opacity: 1; transform: translateY(0) scale(1); }
					100% { opacity: 0; transform: translateY(-40px) scale(0.8); }
				}
				.shiba-bounce { animation: shiba-bounce 0.5s ease-in-out 2; }
				.shiba-word {
					animation: shiba-word-float 1.8s ease-out forwards;
				}
			`}</style>

			<h2 className="text-2xl font-bold text-orange-900 mb-1 text-center">Shiba Inu</h2>
			<p className="text-orange-700 text-sm text-center mb-4 min-h-[1.5rem]"
				style={{ fontFamily: 'Comic Sans MS, cursive' }}>
				{message}
			</p>

			{/* Stats */}
			<div className="flex flex-col gap-2 mb-5">
				{[
					{ label: 'Happiness', val: happiness, color: statColor(happiness) },
					{ label: 'Hunger', val: hunger, color: hungerColor(hunger) },
					{ label: 'Energy', val: energy, color: statColor(energy) },
				].map(({ label, val, color }) => (
					<div key={label}>
						<div className="flex justify-between text-xs text-orange-700 mb-0.5">
							<span>{label}</span>
							<span>{Math.round(val)}%</span>
						</div>
						<div className="w-full h-2.5 bg-orange-200 rounded-full overflow-hidden">
							<div
								className="h-full rounded-full transition-all duration-500"
								style={{ width: `${val}%`, background: color }}
							/>
						</div>
					</div>
				))}
			</div>

			{/* Shiba */}
			<div className="relative flex justify-center items-center" style={{ minHeight: 185 }}>
				<div className={mood === 'excited' ? 'shiba-bounce' : ''}>
					<ShibaSVG mood={mood} wagging={wagging} blinking={blinking} tongue={tongue} />
				</div>
				{/* Doge words */}
				{dogeWords.map((w) => (
					<div
						key={w.id}
						className="shiba-word"
						style={{
							position: 'absolute',
							left: w.x,
							top: w.y,
							color: w.color,
							fontFamily: 'Comic Sans MS, cursive',
							fontSize: '0.8rem',
							fontWeight: 'bold',
							pointerEvents: 'none',
							userSelect: 'none',
							textShadow: '1px 1px 0 rgba(0,0,0,0.15)',
							whiteSpace: 'nowrap',
							zIndex: 10,
						}}
					>
						{w.text}
					</div>
				))}
			</div>

			{/* Mood badge */}
			<div className="flex justify-center mb-4">
				<span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-200 text-orange-800"
					style={{ fontFamily: 'Comic Sans MS, cursive' }}>
					{moodLabel[mood]?.emoji} {moodLabel[mood]?.label}
				</span>
			</div>

			{/* Action buttons */}
			<div className="grid grid-cols-3 gap-3">
				<button
					onClick={handlePet}
					className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl bg-pink-100 border-2 border-pink-300 text-pink-700 font-semibold text-sm active:scale-95 transition-transform select-none"
				>
					<span className="text-xl">🤚</span>
					Pet
				</button>
				<button
					onClick={handleTreat}
					className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl bg-yellow-100 border-2 border-yellow-300 text-yellow-700 font-semibold text-sm active:scale-95 transition-transform select-none"
				>
					<span className="text-xl">🦴</span>
					Treat
				</button>
				<button
					onClick={handleBork}
					className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl bg-orange-100 border-2 border-orange-400 text-orange-700 font-semibold text-sm active:scale-95 transition-transform select-none"
				>
					<span className="text-xl">🔊</span>
					Bork!
				</button>
			</div>
		</div>
	);
}
