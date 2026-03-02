'use client';

import { useState, useRef, useCallback } from 'react';

const DIRT_SPOTS = [
	{ id: 0, cx: 72, cy: 58, rx: 10, ry: 7 },
	{ id: 1, cx: 55, cy: 72, rx: 8, ry: 6 },
	{ id: 2, cx: 90, cy: 70, rx: 9, ry: 6 },
	{ id: 3, cx: 65, cy: 85, rx: 7, ry: 5 },
	{ id: 4, cx: 85, cy: 90, rx: 8, ry: 5 },
	{ id: 5, cx: 75, cy: 100, rx: 9, ry: 6 },
	{ id: 6, cx: 50, cy: 95, rx: 7, ry: 5 },
	{ id: 7, cx: 100, cy: 85, rx: 8, ry: 6 },
	{ id: 8, cx: 60, cy: 112, rx: 7, ry: 5 },
	{ id: 9, cx: 90, cy: 108, rx: 7, ry: 5 },
	{ id: 10, cx: 75, cy: 118, rx: 8, ry: 5 },
	{ id: 11, cx: 45, cy: 80, rx: 6, ry: 4 },
];

function DogSVG({ cleanedSpots }) {
	return (
		<svg
			width="150"
			height="160"
			viewBox="30 20 90 130"
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Dog"
		>
			{/* Body */}
			<ellipse cx="75" cy="100" rx="32" ry="28" fill="#C8A96E" />
			{/* Head */}
			<ellipse cx="75" cy="58" rx="22" ry="20" fill="#C8A96E" />
			{/* Left ear */}
			<ellipse cx="55" cy="48" rx="8" ry="14" fill="#A0784A" transform="rotate(-15 55 48)" />
			{/* Right ear */}
			<ellipse cx="95" cy="48" rx="8" ry="14" fill="#A0784A" transform="rotate(15 95 48)" />
			{/* Snout */}
			<ellipse cx="75" cy="66" rx="12" ry="9" fill="#B8966A" />
			{/* Nose */}
			<ellipse cx="75" cy="62" rx="5" ry="3.5" fill="#2d1a0e" />
			{/* Left eye */}
			<circle cx="65" cy="54" r="4" fill="#2d1a0e" />
			<circle cx="66" cy="53" r="1.2" fill="#fff" />
			{/* Right eye */}
			<circle cx="85" cy="54" r="4" fill="#2d1a0e" />
			<circle cx="86" cy="53" r="1.2" fill="#fff" />
			{/* Mouth */}
			<path d="M70 70 Q75 74 80 70" stroke="#2d1a0e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
			{/* Tail */}
			<path d="M107 90 Q120 75 115 62" stroke="#A0784A" strokeWidth="7" fill="none" strokeLinecap="round" />
			{/* Front left leg */}
			<rect x="56" y="122" width="10" height="22" rx="5" fill="#C8A96E" />
			{/* Front right leg */}
			<rect x="84" y="122" width="10" height="22" rx="5" fill="#C8A96E" />

			{/* Dirt spots */}
			{DIRT_SPOTS.map((spot) =>
				cleanedSpots.has(spot.id) ? null : (
					<ellipse
						key={spot.id}
						cx={spot.cx}
						cy={spot.cy}
						rx={spot.rx}
						ry={spot.ry}
						fill="#7a5c2e"
						opacity="0.7"
					/>
				)
			)}

			{/* Sparkles when clean */}
			{cleanedSpots.size === DIRT_SPOTS.length && (
				<>
					<text x="36" y="35" fontSize="10" className="sparkle-star">✨</text>
					<text x="108" y="35" fontSize="10" className="sparkle-star">✨</text>
					<text x="72" y="25" fontSize="10" className="sparkle-star">⭐</text>
				</>
			)}
		</svg>
	);
}

export default function CleanDog() {
	const [cleanedSpots, setCleanedSpots] = useState(new Set());
	const [bubbles, setBubbles] = useState([]);
	const [scrubs, setScrubs] = useState(0);
	const bubbleId = useRef(0);
	const svgRef = useRef(null);

	const cleanPct = Math.round((cleanedSpots.size / DIRT_SPOTS.length) * 100);
	const isClean = cleanedSpots.size === DIRT_SPOTS.length;

	const handleScrub = useCallback((e) => {
		if (isClean) return;

		const rect = svgRef.current?.getBoundingClientRect();
		if (!rect) return;

		const clientX = e.touches ? e.touches[0].clientX : e.clientX;
		const clientY = e.touches ? e.touches[0].clientY : e.clientY;
		const relX = clientX - rect.left;
		const relY = clientY - rect.top;

		// Convert to SVG coordinate space (viewBox: 30 20 90 130)
		const svgX = 30 + (relX / rect.width) * 90;
		const svgY = 20 + (relY / rect.height) * 130;

		// Find nearby uncleaned dirt spots
		const nearbySpots = DIRT_SPOTS.filter((spot) => {
			if (cleanedSpots.has(spot.id)) return false;
			const dx = (svgX - spot.cx) / spot.rx;
			const dy = (svgY - spot.cy) / spot.ry;
			return dx * dx + dy * dy <= 2.5;
		});

		if (nearbySpots.length > 0) {
			setCleanedSpots((prev) => {
				const next = new Set(prev);
				nearbySpots.forEach((s) => next.add(s.id));
				return next;
			});
		}

		// Also clean a random uncleaned spot every few scrubs
		setScrubs((prev) => {
			const next = prev + 1;
			if (next % 4 === 0) {
				setCleanedSpots((c) => {
					const remaining = DIRT_SPOTS.filter((s) => !c.has(s.id));
					if (remaining.length === 0) return c;
					const pick = remaining[Math.floor(Math.random() * remaining.length)];
					const next2 = new Set(c);
					next2.add(pick.id);
					return next2;
				});
			}
			return next;
		});

		// Add bubble effect
		const id = bubbleId.current++;
		setBubbles((prev) => [...prev, { id, x: relX, y: relY }]);
		setTimeout(() => setBubbles((prev) => prev.filter((b) => b.id !== id)), 700);
	}, [isClean, cleanedSpots]);

	const handleReset = () => {
		setCleanedSpots(new Set());
		setScrubs(0);
		setBubbles([]);
	};

	return (
		<div className="p-6 bg-sky-50/80 rounded-lg border-2 border-sky-300 w-full max-w-xl">
			<h2 className="text-2xl font-bold text-sky-900 mb-1 text-center">Clean Dog</h2>
			<p className="text-sky-700 text-sm text-center mb-4">
				{isClean ? '✨ Sparkling clean! Good job!' : 'Tap the dog to scrub off the dirt!'}
			</p>

			{/* Cleanliness bar */}
			<div className="mb-4">
				<div className="flex justify-between text-xs text-sky-700 mb-1">
					<span>Cleanliness</span>
					<span>{cleanPct}%</span>
				</div>
				<div className="w-full h-3 bg-sky-200 rounded-full overflow-hidden">
					<div
						className="h-full rounded-full transition-all duration-300"
						style={{
							width: `${cleanPct}%`,
							background: isClean
								? 'linear-gradient(90deg, #f59e0b, #10b981)'
								: 'linear-gradient(90deg, #38bdf8, #0ea5e9)',
						}}
					/>
				</div>
			</div>

			{/* Dog interactive area */}
			<div
				ref={svgRef}
				className="relative flex justify-center items-center cursor-pointer select-none touch-manipulation"
				style={{ minHeight: 180 }}
				onClick={handleScrub}
				onTouchStart={handleScrub}
				aria-label="Scrub the dog"
				role="button"
			>
				<style>{`
					@keyframes bubble-pop {
						0% { transform: scale(0.3); opacity: 0.9; }
						60% { transform: scale(1.1); opacity: 0.7; }
						100% { transform: scale(1.4); opacity: 0; }
					}
					.bubble { animation: bubble-pop 0.7s ease-out forwards; pointer-events: none; }
					@keyframes sparkle-pulse {
						0%, 100% { opacity: 1; transform: scale(1); }
						50% { opacity: 0.5; transform: scale(1.3); }
					}
					.sparkle-star { animation: sparkle-pulse 1s ease-in-out infinite; }
				`}</style>

				<DogSVG cleanedSpots={cleanedSpots} />

				{/* Bubble effects */}
				{bubbles.map((b) => (
					<div
						key={b.id}
						className="bubble absolute"
						style={{
							left: b.x - 14,
							top: b.y - 14,
							width: 28,
							height: 28,
							borderRadius: '50%',
							border: '2px solid rgba(14, 165, 233, 0.6)',
							background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.8), rgba(14,165,233,0.2))',
						}}
					/>
				))}
			</div>

			{/* Reset */}
			{cleanedSpots.size > 0 && (
				<div className="flex justify-center mt-3">
					<button
						onClick={handleReset}
						className="text-sky-600 text-xs underline underline-offset-2 hover:text-sky-800 transition-colors"
					>
						{isClean ? 'Get dirty again 🐾' : 'Reset'}
					</button>
				</div>
			)}
		</div>
	);
}
