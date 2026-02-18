'use client';

import { useState, useEffect, useRef } from 'react';

const GOAL = 10000;

const milestones = [
	{ steps: 1000, label: '1K pasos', emoji: '🚶' },
	{ steps: 2500, label: '2.5K pasos', emoji: '🏃' },
	{ steps: 5000, label: '5K pasos', emoji: '🌟' },
	{ steps: 7500, label: '7.5K pasos', emoji: '💪' },
	{ steps: 10000, label: '¡Meta!', emoji: '🏆' },
];

function WalkerFigure({ isWalking, stepCount }) {
	const phase = stepCount % 2;
	return (
		<svg
			width="60"
			height="80"
			viewBox="0 0 60 80"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			{/* Head */}
			<circle cx="30" cy="12" r="10" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
			{/* Eyes */}
			<circle cx="26" cy="10" r="1.5" fill="#1F2937" />
			<circle cx="34" cy="10" r="1.5" fill="#1F2937" />
			{/* Smile */}
			<path d="M26 15 Q30 18 34 15" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" fill="none" />
			{/* Body */}
			<rect x="22" y="24" width="16" height="22" rx="4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
			{/* Arms */}
			{isWalking && phase === 0 ? (
				<>
					<line x1="22" y1="28" x2="10" y2="38" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
					<line x1="38" y1="28" x2="50" y2="18" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
				</>
			) : (
				<>
					<line x1="22" y1="28" x2="10" y2="18" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
					<line x1="38" y1="28" x2="50" y2="38" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
				</>
			)}
			{/* Legs */}
			{isWalking && phase === 0 ? (
				<>
					<line x1="26" y1="46" x2="18" y2="68" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />
					<line x1="34" y1="46" x2="44" y2="60" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />
					{/* Feet */}
					<line x1="18" y1="68" x2="8" y2="68" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
					<line x1="44" y1="60" x2="54" y2="60" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
				</>
			) : (
				<>
					<line x1="26" y1="46" x2="16" y2="60" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />
					<line x1="34" y1="46" x2="42" y2="68" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />
					{/* Feet */}
					<line x1="16" y1="60" x2="6" y2="60" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
					<line x1="42" y1="68" x2="52" y2="68" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
				</>
			)}
		</svg>
	);
}

export default function Caminar() {
	const [steps, setSteps] = useState(0);
	const [isWalking, setIsWalking] = useState(false);
	const [ripples, setRipples] = useState([]);
	const [milestoneMsg, setMilestoneMsg] = useState(null);
	const rippleId = useRef(0);
	const walkTimer = useRef(null);
	const prevMilestone = useRef(-1);

	const progress = Math.min((steps / GOAL) * 100, 100);
	const km = ((steps * 0.762) / 1000).toFixed(2);
	const cal = Math.round(steps * 0.04);

	// Check milestones
	useEffect(() => {
		for (let i = milestones.length - 1; i >= 0; i--) {
			if (steps >= milestones[i].steps && prevMilestone.current < i) {
				prevMilestone.current = i;
				setMilestoneMsg(milestones[i]);
				const t = setTimeout(() => setMilestoneMsg(null), 2500);
				return () => clearTimeout(t);
			}
		}
	}, [steps]);

	const handleStep = (e) => {
		// Add ripple effect
		const rect = e.currentTarget.getBoundingClientRect();
		const clientX = e.touches ? e.touches[0].clientX : e.clientX;
		const clientY = e.touches ? e.touches[0].clientY : e.clientY;
		const x = clientX - rect.left;
		const y = clientY - rect.top;
		const id = rippleId.current++;
		setRipples(prev => [...prev, { id, x, y }]);
		setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);

		setSteps(s => s + 1);
		setIsWalking(true);

		clearTimeout(walkTimer.current);
		walkTimer.current = setTimeout(() => setIsWalking(false), 400);
	};

	const handleReset = () => {
		setSteps(0);
		prevMilestone.current = -1;
		setMilestoneMsg(null);
		setIsWalking(false);
	};

	const reached = milestones.filter(m => steps >= m.steps);
	const nextMilestone = milestones.find(m => steps < m.steps);

	return (
		<div className="w-full rounded-2xl overflow-hidden shadow-xl mb-8" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d6a4f 100%)' }}>
			{/* Header */}
			<div className="px-5 pt-5 pb-3 text-center">
				<h2 className="text-white text-2xl font-bold tracking-tight">¡Caminar!</h2>
				<p className="text-green-200 text-sm mt-1">Toca el botón para dar pasos</p>
			</div>

			{/* Stats row */}
			<div className="flex justify-around px-4 pb-4">
				<div className="text-center">
					<p className="text-white text-2xl font-bold">{steps.toLocaleString()}</p>
					<p className="text-green-300 text-xs">pasos</p>
				</div>
				<div className="text-center">
					<p className="text-white text-2xl font-bold">{km}</p>
					<p className="text-green-300 text-xs">km</p>
				</div>
				<div className="text-center">
					<p className="text-white text-2xl font-bold">{cal}</p>
					<p className="text-green-300 text-xs">kcal</p>
				</div>
			</div>

			{/* Progress bar */}
			<div className="px-4 pb-3">
				<div className="flex justify-between text-xs text-green-300 mb-1">
					<span>0</span>
					<span>Meta: {GOAL.toLocaleString()} pasos</span>
				</div>
				<div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
					<div
						className="h-full rounded-full transition-all duration-300"
						style={{
							width: `${progress}%`,
							background: progress >= 100
								? 'linear-gradient(90deg, #f59e0b, #ef4444)'
								: 'linear-gradient(90deg, #34d399, #10b981)',
						}}
					/>
				</div>
				{nextMilestone && (
					<p className="text-green-300 text-xs mt-1 text-right">
						Siguiente: {nextMilestone.emoji} {nextMilestone.label} ({(nextMilestone.steps - steps).toLocaleString()} más)
					</p>
				)}
			</div>

			{/* Walker + tap button */}
			<div className="flex flex-col items-center pb-5 px-4 gap-4">
				{/* Milestone badge */}
				{milestoneMsg && (
					<div
						className="text-center animate-bounce bg-yellow-400 text-yellow-900 font-bold px-5 py-2 rounded-full text-sm shadow-lg"
					>
						{milestoneMsg.emoji} ¡{milestoneMsg.label} alcanzados!
					</div>
				)}

				{/* Walker animation */}
				<div className={`transition-transform duration-100 ${isWalking ? 'scale-110' : 'scale-100'}`}>
					<WalkerFigure isWalking={isWalking} stepCount={steps} />
				</div>

				{/* Tap button */}
				<button
					className="relative overflow-hidden w-32 h-32 rounded-full font-bold text-white text-lg shadow-2xl active:scale-95 transition-transform touch-manipulation select-none"
					style={{
						background: isWalking
							? 'linear-gradient(135deg, #10b981, #059669)'
							: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
						boxShadow: isWalking
							? '0 0 30px rgba(16,185,129,0.6)'
							: '0 0 20px rgba(59,130,246,0.4)',
					}}
					onClick={handleStep}
					onTouchStart={handleStep}
					aria-label="Dar un paso"
				>
					{ripples.map(r => (
						<span
							key={r.id}
							className="absolute rounded-full bg-white/30 animate-ping"
							style={{
								width: 80,
								height: 80,
								left: r.x - 40,
								top: r.y - 40,
								animationDuration: '0.6s',
								animationIterationCount: 1,
							}}
						/>
					))}
					<span className="relative z-10 flex flex-col items-center gap-1">
						<span className="text-3xl">👟</span>
						<span className="text-sm">¡Paso!</span>
					</span>
				</button>

				{/* Milestones achieved */}
				{reached.length > 0 && (
					<div className="flex gap-2 flex-wrap justify-center">
						{reached.map(m => (
							<span
								key={m.steps}
								className="bg-white/20 text-white text-xs px-3 py-1 rounded-full"
							>
								{m.emoji} {m.label}
							</span>
						))}
					</div>
				)}

				{/* Reset */}
				{steps > 0 && (
					<button
						onClick={handleReset}
						className="text-green-300 text-xs underline underline-offset-2 hover:text-white transition-colors"
					>
						Reiniciar
					</button>
				)}
			</div>
		</div>
	);
}
