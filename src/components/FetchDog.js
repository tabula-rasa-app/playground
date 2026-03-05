'use client';

import { useState, useCallback, useRef } from 'react';

function DogSVG({ withBall = false }) {
	return (
		<svg
			width="70"
			height="75"
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
			<ellipse cx="64" cy="52" rx="5" ry="5" fill="#2d1a0e" />
			<circle cx="65.5" cy="51" r="1.5" fill="#fff" />
			{/* Right eye */}
			<ellipse cx="86" cy="52" rx="5" ry="5" fill="#2d1a0e" />
			<circle cx="87.5" cy="51" r="1.5" fill="#fff" />
			{/* Mouth */}
			<path d="M70 70 Q75 75 80 70" stroke="#2d1a0e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
			{/* Tail */}
			<path d="M107 90 Q122 75 118 58" stroke="#A0784A" strokeWidth="8" fill="none" strokeLinecap="round" />
			{/* Front left leg */}
			<rect x="57" y="120" width="10" height="24" rx="5" fill="#C8A96E" />
			{/* Front right leg */}
			<rect x="83" y="120" width="10" height="24" rx="5" fill="#C8A96E" />
			{/* Ball in mouth */}
			{withBall && (
				<circle cx="75" cy="76" r="9" fill="#ef4444" stroke="#c53030" strokeWidth="1.5" />
			)}
		</svg>
	);
}

export default function FetchDog() {
	const [dogX, setDogX] = useState(8);
	const [ballX, setBallX] = useState(8);
	const [ballVisible, setBallVisible] = useState(false);
	const [phase, setPhase] = useState('idle');
	const [score, setScore] = useState(0);
	const fieldRef = useRef(null);
	const inProgress = useRef(false);

	const handleThrow = useCallback((e) => {
		if (inProgress.current) return;

		const rect = fieldRef.current?.getBoundingClientRect();
		if (!rect) return;

		const clientX = e.touches ? e.touches[0].clientX : e.clientX;
		const xPct = Math.max(25, Math.min(88, ((clientX - rect.left) / rect.width) * 100));

		inProgress.current = true;

		setBallX(8);
		setBallVisible(true);
		setPhase('throwing');

		setTimeout(() => setBallX(xPct), 50);

		setTimeout(() => {
			setPhase('fetching');
			setDogX(xPct - 6);
		}, 700);

		setTimeout(() => {
			setPhase('returning');
			setBallVisible(false);
			setDogX(8);
		}, 1900);

		setTimeout(() => {
			setPhase('idle');
			setScore((s) => s + 1);
			inProgress.current = false;
		}, 3200);
	}, []);

	const isRunning = phase === 'fetching' || phase === 'returning';
	const facingLeft = phase === 'returning';

	const messages = {
		idle: 'Tap the field to throw the ball!',
		throwing: 'Go fetch!',
		fetching: 'Running to get the ball...',
		returning: 'Good dog! Coming back!',
	};

	const praise =
		score >= 10 ? 'Champion fetcher!' : score >= 5 ? 'Great dog!' : 'Keep going!';

	return (
		<div className="p-6 bg-green-50/80 rounded-xl border-2 border-green-300 w-full max-w-xl">
			<style>{`
				@keyframes fetchdog-run {
					0%, 100% { transform: translateY(0px); }
					50% { transform: translateY(-5px); }
				}
				.fetchdog-running { animation: fetchdog-run 0.25s ease-in-out infinite; }
				@keyframes fetchdog-ball-arc {
					0% { transform: translateY(0); }
					40% { transform: translateY(-36px); }
					100% { transform: translateY(0); }
				}
				.fetchdog-ball-fly { animation: fetchdog-ball-arc 0.65s ease-out; }
			`}</style>

			<h2 className="text-2xl font-bold text-green-900 mb-1 text-center">Fetch!</h2>
			<p className="text-green-700 text-sm text-center mb-3 min-h-[1.25rem]">
				{messages[phase]}
			</p>

			<div className="flex justify-between items-center mb-3 px-1">
				<span className="text-green-800 font-bold">Fetches: {score}</span>
				{score > 0 && (
					<span className="text-green-700 text-sm">{praise}</span>
				)}
			</div>

			{/* Playing field */}
			<div
				ref={fieldRef}
				className="relative w-full rounded-xl overflow-hidden cursor-pointer select-none touch-manipulation"
				style={{
					height: 150,
					background: 'linear-gradient(180deg, #bbf7d0 0%, #86efac 55%, #22c55e 100%)',
					border: '2px solid #16a34a',
				}}
				onClick={handleThrow}
				onTouchStart={handleThrow}
				role="button"
				aria-label="Tap to throw ball"
			>
				{/* Ground line */}
				<div
					style={{
						position: 'absolute',
						bottom: 30,
						left: 0,
						right: 0,
						height: 2,
						background: '#16a34a',
						opacity: 0.3,
					}}
				/>

				{/* Ball */}
				{ballVisible && (
					<div
						className={phase === 'throwing' ? 'fetchdog-ball-fly' : ''}
						style={{
							position: 'absolute',
							left: `${ballX}%`,
							bottom: 34,
							fontSize: '1.4rem',
							transition: phase === 'throwing' ? 'left 0.65s cubic-bezier(0.2, 0.8, 0.5, 1)' : 'none',
							pointerEvents: 'none',
						}}
					>
						&#127934;
					</div>
				)}

				{/* Dog - outer div handles facing direction, inner handles bounce */}
				<div
					style={{
						position: 'absolute',
						left: `${dogX}%`,
						bottom: 10,
						transition: 'left 1.2s ease-in-out',
						transform: facingLeft ? 'scaleX(-1)' : 'scaleX(1)',
						pointerEvents: 'none',
					}}
				>
					<div className={isRunning ? 'fetchdog-running' : ''}>
						<DogSVG withBall={phase === 'returning'} />
					</div>
				</div>
			</div>
		</div>
	);
}
