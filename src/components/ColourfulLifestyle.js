'use client';

import { useState } from 'react';

const LIFESTYLE_ITEMS = [
	{
		id: 0,
		emoji: '🧘',
		label: 'Yoga',
		color: '#f472b6',
		bg: '#fdf2f8',
		border: '#f9a8d4',
		fact: 'Just 10 minutes of yoga a day boosts your mood and flexibility!',
	},
	{
		id: 1,
		emoji: '🎨',
		label: 'Art',
		color: '#a855f7',
		bg: '#faf5ff',
		border: '#d8b4fe',
		fact: 'Creating art lowers stress hormones by up to 75%.',
	},
	{
		id: 2,
		emoji: '🥗',
		label: 'Eat Fresh',
		color: '#22c55e',
		bg: '#f0fdf4',
		border: '#86efac',
		fact: 'Colourful meals pack the most vitamins and antioxidants!',
	},
	{
		id: 3,
		emoji: '🚴',
		label: 'Cycling',
		color: '#f59e0b',
		bg: '#fffbeb',
		border: '#fcd34d',
		fact: 'Cycling 30 min a day can add years to your life.',
	},
	{
		id: 4,
		emoji: '🎵',
		label: 'Music',
		color: '#3b82f6',
		bg: '#eff6ff',
		border: '#93c5fd',
		fact: 'Listening to music you love releases dopamine — instant joy!',
	},
	{
		id: 5,
		emoji: '🌿',
		label: 'Nature',
		color: '#10b981',
		bg: '#ecfdf5',
		border: '#6ee7b7',
		fact: '20 minutes in nature significantly reduces cortisol levels.',
	},
	{
		id: 6,
		emoji: '📖',
		label: 'Reading',
		color: '#ef4444',
		bg: '#fef2f2',
		border: '#fca5a5',
		fact: 'Reading fiction boosts empathy and reduces stress.',
	},
	{
		id: 7,
		emoji: '💃',
		label: 'Dance',
		color: '#ec4899',
		bg: '#fdf2f8',
		border: '#f9a8d4',
		fact: 'Dancing is one of the best full-body workouts — and it\'s fun!',
	},
	{
		id: 8,
		emoji: '✈️',
		label: 'Travel',
		color: '#6366f1',
		bg: '#eef2ff',
		border: '#a5b4fc',
		fact: 'Travelling to new places reshapes your brain for creativity.',
	},
];

const GRADIENT_BG = 'linear-gradient(135deg, #fce4ec 0%, #e8f5e9 30%, #e3f2fd 60%, #ede7f6 100%)';

export default function ColourfulLifestyle() {
	const [active, setActive] = useState(null);
	const [popped, setPopped] = useState(new Set());

	const handleTap = (item) => {
		setActive(item.id === active ? null : item.id);
		setPopped((prev) => {
			const next = new Set(prev);
			next.add(item.id);
			return next;
		});
	};

	const handleReset = () => {
		setActive(null);
		setPopped(new Set());
	};

	return (
		<div
			className="p-6 rounded-xl border-2 w-full max-w-xl"
			style={{
				background: GRADIENT_BG,
				borderColor: '#e879f9',
			}}
		>
			<style>{`
				@keyframes cl-pop {
					0% { transform: scale(1); }
					40% { transform: scale(1.18); }
					70% { transform: scale(0.94); }
					100% { transform: scale(1); }
				}
				@keyframes cl-fact-in {
					from { opacity: 0; transform: translateY(6px); }
					to { opacity: 1; transform: translateY(0); }
				}
				.cl-pop { animation: cl-pop 0.35s ease; }
				.cl-fact { animation: cl-fact-in 0.3s ease; }
				@keyframes cl-rainbow {
					0% { background-position: 0% 50%; }
					50% { background-position: 100% 50%; }
					100% { background-position: 0% 50%; }
				}
				.cl-title {
					background: linear-gradient(90deg, #f472b6, #a855f7, #3b82f6, #22c55e, #f59e0b, #ef4444, #f472b6);
					background-size: 200% auto;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
					animation: cl-rainbow 4s linear infinite;
				}
			`}</style>

			<h2 className="text-2xl font-bold mb-1 text-center cl-title">Colourful Lifestyle</h2>
			<p className="text-sm text-center mb-5" style={{ color: '#7c3aed' }}>
				Tap a tile to discover a lifestyle tip!
			</p>

			<div className="grid grid-cols-3 gap-3">
				{LIFESTYLE_ITEMS.map((item) => {
					const isActive = active === item.id;
					const wasPopped = popped.has(item.id);
					return (
						<button
							key={item.id}
							onClick={() => handleTap(item)}
							className={`flex flex-col items-center justify-center rounded-xl p-3 transition-all duration-200 select-none border-2 focus:outline-none ${wasPopped ? 'cl-pop' : ''}`}
							style={{
								background: isActive ? item.color : item.bg,
								borderColor: isActive ? item.color : item.border,
								boxShadow: isActive
									? `0 4px 16px ${item.color}55`
									: '0 1px 4px rgba(0,0,0,0.07)',
								transform: isActive ? 'scale(1.07)' : 'scale(1)',
							}}
							aria-pressed={isActive}
							aria-label={item.label}
						>
							<span style={{ fontSize: '2rem', lineHeight: 1 }}>{item.emoji}</span>
							<span
								className="text-xs font-semibold mt-1"
								style={{ color: isActive ? '#fff' : item.color }}
							>
								{item.label}
							</span>
						</button>
					);
				})}
			</div>

			{active !== null && (
				<div
					className="cl-fact mt-5 rounded-xl p-4 text-sm text-center font-medium"
					style={{
						background: LIFESTYLE_ITEMS[active].bg,
						borderLeft: `4px solid ${LIFESTYLE_ITEMS[active].color}`,
						color: LIFESTYLE_ITEMS[active].color,
					}}
				>
					<span style={{ fontSize: '1.3rem' }}>{LIFESTYLE_ITEMS[active].emoji}</span>{' '}
					{LIFESTYLE_ITEMS[active].fact}
				</div>
			)}

			{popped.size > 0 && (
				<div className="flex justify-center mt-4">
					<button
						onClick={handleReset}
						className="text-xs underline underline-offset-2 transition-colors"
						style={{ color: '#a855f7' }}
					>
						Reset ✨
					</button>
				</div>
			)}
		</div>
	);
}
