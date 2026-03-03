'use client';

import { useState, useEffect, useRef } from 'react';

const MOODS = {
	happy: { emoji: '😊', label: 'Happy', tail: true },
	excited: { emoji: '🤩', label: 'Excited!', tail: true },
	hungry: { emoji: '😋', label: 'Hungry', tail: false },
	sleepy: { emoji: '😴', label: 'Sleepy', tail: false },
	playful: { emoji: '😄', label: 'Playful!', tail: true },
};

function DogSVG({ mood, wagging, blinking, tongue }) {
	const eyeRy = blinking ? 1 : 5;
	const tailPath = wagging
		? 'M107 88 Q128 68 120 50'
		: 'M107 90 Q122 75 118 58';

	return (
		<svg
			width="160"
			height="170"
			viewBox="28 18 96 138"
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Dog"
		>
			{/* Body */}
			<ellipse cx="75" cy="100" rx="33" ry="28" fill="#C8A96E" />
			{/* Head */}
			<ellipse cx="75" cy="57" rx="23" ry="21" fill="#C8A96E" />
			{/* Left ear */}
			<ellipse cx="54" cy="46" rx="9" ry="15" fill="#A0784A" transform="rotate(-15 54 46)" />
			{/* Right ear */}
			<ellipse cx="96" cy="46" rx="9" ry="15" fill="#A0784A" transform="rotate(15 96 46)" />
			{/* Snout */}
			<ellipse cx="75" cy="66" rx="13" ry="10" fill="#B8966A" />
			{/* Nose */}
			<ellipse cx="75" cy="61" rx="5.5" ry="4" fill="#2d1a0e" />
			{/* Left eye */}
			<circle cx="64" cy="52" r="5" fill="#2d1a0e" />
			<ellipse cx="64" cy="52" rx="5" ry={eyeRy} fill="#2d1a0e" />
			<circle cx="65.5" cy="51" r="1.5" fill="#fff" />
			{/* Right eye */}
			<ellipse cx="86" cy="52" rx="5" ry={eyeRy} fill="#2d1a0e" />
			<circle cx="87.5" cy="51" r="1.5" fill="#fff" />
			{/* Mouth */}
			<path d="M70 70 Q75 75 80 70" stroke="#2d1a0e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
			{/* Tongue */}
			{tongue && (
				<ellipse cx="75" cy="75" rx="5" ry="6" fill="#e879a0" />
			)}
			{/* Tail */}
			<path
				d={tailPath}
				stroke="#A0784A"
				strokeWidth="8"
				fill="none"
				strokeLinecap="round"
				style={{ transition: 'd 0.15s ease' }}
			/>
			{/* Front left leg */}
			<rect x="57" y="120" width="10" height="24" rx="5" fill="#C8A96E" />
			{/* Front right leg */}
			<rect x="83" y="120" width="10" height="24" rx="5" fill="#C8A96E" />
			{/* Back leg hint */}
			<ellipse cx="55" cy="112" rx="9" ry="6" fill="#B8966A" />
			<ellipse cx="97" cy="112" rx="9" ry="6" fill="#B8966A" />

			{/* Mood indicator */}
			{mood === 'excited' && (
				<>
					<text x="36" y="32" fontSize="10">✨</text>
					<text x="108" y="32" fontSize="10">✨</text>
				</>
			)}
			{mood === 'sleepy' && (
				<>
					<text x="96" y="36" fontSize="9">💤</text>
				</>
			)}
		</svg>
	);
}

export default function ADog() {
	const [happiness, setHappiness] = useState(70);
	const [hunger, setHunger] = useState(50);
	const [energy, setEnergy] = useState(80);
	const [mood, setMood] = useState('happy');
	const [wagging, setWagging] = useState(false);
	const [blinking, setBlinking] = useState(false);
	const [tongue, setTongue] = useState(false);
	const [message, setMessage] = useState('Hello! I am your dog. 🐾');
	const [particles, setParticles] = useState([]);
	const particleId = useRef(0);
	const wagInterval = useRef(null);
	const blinkInterval = useRef(null);
	const decayInterval = useRef(null);

	// Compute mood from stats
	useEffect(() => {
		if (energy < 25) setMood('sleepy');
		else if (hunger > 75) setMood('hungry');
		else if (happiness > 85) setMood('excited');
		else if (happiness > 60) setMood('happy');
		else setMood('happy');
	}, [happiness, hunger, energy]);

	// Tail wag when happy/excited
	useEffect(() => {
		clearInterval(wagInterval.current);
		if (mood === 'happy' || mood === 'excited' || mood === 'playful') {
			wagInterval.current = setInterval(() => {
				setWagging((w) => !w);
			}, mood === 'excited' ? 200 : 400);
		} else {
			setWagging(false);
		}
		return () => clearInterval(wagInterval.current);
	}, [mood]);

	// Random blink
	useEffect(() => {
		const scheduleBlink = () => {
			const delay = 2000 + Math.random() * 3000;
			blinkInterval.current = setTimeout(() => {
				setBlinking(true);
				setTimeout(() => setBlinking(false), 150);
				scheduleBlink();
			}, delay);
		};
		scheduleBlink();
		return () => clearTimeout(blinkInterval.current);
	}, []);

	// Stat decay over time
	useEffect(() => {
		decayInterval.current = setInterval(() => {
			setHappiness((h) => Math.max(0, h - 1));
			setHunger((h) => Math.min(100, h + 1));
			setEnergy((e) => Math.max(0, e - 0.5));
		}, 5000);
		return () => clearInterval(decayInterval.current);
	}, []);

	const spawnParticles = (emoji, count = 4) => {
		const newParticles = Array.from({ length: count }, (_, i) => ({
			id: particleId.current++,
			emoji,
			x: 30 + Math.random() * 100,
			y: 20 + Math.random() * 80,
			dx: (Math.random() - 0.5) * 60,
			dy: -(20 + Math.random() * 40),
		}));
		setParticles((prev) => [...prev, ...newParticles]);
		setTimeout(() => {
			setParticles((prev) =>
				prev.filter((p) => !newParticles.find((n) => n.id === p.id))
			);
		}, 900);
	};

	const handlePet = () => {
		setHappiness((h) => Math.min(100, h + 12));
		setMood('excited');
		setTongue(true);
		setTimeout(() => setTongue(false), 1000);
		setMessage('Woof! I love pets! 🐾');
		spawnParticles('💕', 5);
		setTimeout(() => setMessage(getIdleMessage), 2500);
	};

	const handleFeed = () => {
		if (hunger < 10) {
			setMessage("I'm not hungry right now! 😅");
			return;
		}
		setHunger((h) => Math.max(0, h - 30));
		setHappiness((h) => Math.min(100, h + 8));
		setEnergy((e) => Math.min(100, e + 10));
		setTongue(true);
		setTimeout(() => setTongue(false), 800);
		setMessage('Nom nom nom! Yummy! 🍖');
		spawnParticles('🍖', 4);
		setTimeout(() => setMessage(getIdleMessage), 2500);
	};

	const handlePlay = () => {
		if (energy < 15) {
			setMessage("I'm too tired to play... 😴");
			return;
		}
		setHappiness((h) => Math.min(100, h + 15));
		setEnergy((e) => Math.max(0, e - 20));
		setHunger((h) => Math.min(100, h + 5));
		setMood('playful');
		setMessage('Yay! Let\'s play! 🎾');
		spawnParticles('🎾', 5);
		setTimeout(() => setMessage(getIdleMessage), 2500);
	};

	const getIdleMessage = () => {
		if (energy < 25) return 'Zzzz... so sleepy... 💤';
		if (hunger > 75) return 'My tummy is rumbling... 🍖';
		if (happiness > 85) return 'Life is AMAZING! 🌟';
		return 'Woof! What shall we do? 🐾';
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

	return (
		<div className="p-6 bg-amber-50/80 rounded-xl border-2 border-amber-300 w-full max-w-xl">
			<style>{`
				@keyframes adog-bounce {
					0%, 100% { transform: translateY(0); }
					50% { transform: translateY(-8px); }
				}
				@keyframes adog-float {
					0% { opacity: 1; transform: translate(0, 0) scale(1); }
					100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.5); }
				}
				.adog-bounce { animation: adog-bounce 0.6s ease-in-out 2; }
				.adog-particle {
					position: absolute;
					pointer-events: none;
					animation: adog-float 0.9s ease-out forwards;
					font-size: 1.3rem;
				}
			`}</style>

			<h2 className="text-2xl font-bold text-amber-900 mb-1 text-center">A Dog</h2>
			<p className="text-amber-700 text-sm text-center mb-4 min-h-[1.5rem]">
				{typeof message === 'function' ? message() : message}
			</p>

			{/* Stats */}
			<div className="flex flex-col gap-2 mb-5">
				{[
					{ label: 'Happiness', val: happiness, color: statColor(happiness) },
					{ label: 'Hunger', val: hunger, color: hungerColor(hunger), invert: true },
					{ label: 'Energy', val: energy, color: statColor(energy) },
				].map(({ label, val, color }) => (
					<div key={label}>
						<div className="flex justify-between text-xs text-amber-700 mb-0.5">
							<span>{label}</span>
							<span>{Math.round(val)}%</span>
						</div>
						<div className="w-full h-2.5 bg-amber-200 rounded-full overflow-hidden">
							<div
								className="h-full rounded-full transition-all duration-500"
								style={{ width: `${val}%`, background: color }}
							/>
						</div>
					</div>
				))}
			</div>

			{/* Dog */}
			<div className="relative flex justify-center items-center" style={{ minHeight: 180 }}>
				<div className={mood === 'excited' || mood === 'playful' ? 'adog-bounce' : ''}>
					<DogSVG mood={mood} wagging={wagging} blinking={blinking} tongue={tongue} />
				</div>
				{/* Particles */}
				{particles.map((p) => (
					<span
						key={p.id}
						className="adog-particle"
						style={{
							left: p.x,
							top: p.y,
							'--dx': `${p.dx}px`,
							'--dy': `${p.dy}px`,
						}}
					>
						{p.emoji}
					</span>
				))}
			</div>

			{/* Mood badge */}
			<div className="flex justify-center mb-4">
				<span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-200 text-amber-800">
					{MOODS[mood]?.emoji} {MOODS[mood]?.label}
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
					onClick={handleFeed}
					className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl bg-orange-100 border-2 border-orange-300 text-orange-700 font-semibold text-sm active:scale-95 transition-transform select-none"
				>
					<span className="text-xl">🍖</span>
					Feed
				</button>
				<button
					onClick={handlePlay}
					className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl bg-green-100 border-2 border-green-300 text-green-700 font-semibold text-sm active:scale-95 transition-transform select-none"
				>
					<span className="text-xl">🎾</span>
					Play
				</button>
			</div>
		</div>
	);
}
