'use client';

import { useState, useEffect, useRef } from 'react';

const FIRE_MESSAGES = [
	'🔥 This is fine.',
	'Everything is on fire!',
	'So hot right now 🌡️',
	'Burn baby burn!',
	'Too hot to handle 🔥',
	'We didn\'t start the fire!',
];

function FireSVG({ intensity }) {
	const scale = 0.6 + intensity * 0.8;
	const opacity = 0.7 + intensity * 0.3;

	return (
		<svg
			width="160"
			height="200"
			viewBox="0 0 160 200"
			xmlns="http://www.w3.org/2000/svg"
			style={{ filter: `drop-shadow(0 0 ${8 + intensity * 20}px rgba(255, 100, 0, 0.8))` }}
		>
			<defs>
				<radialGradient id="glowGrad" cx="50%" cy="80%" r="60%">
					<stop offset="0%" stopColor="#ff6600" stopOpacity="0.4" />
					<stop offset="100%" stopColor="#ff6600" stopOpacity="0" />
				</radialGradient>
			</defs>

			{/* Glow base */}
			<ellipse cx="80" cy="185" rx={40 * scale} ry={12} fill="url(#glowGrad)" opacity={opacity} />

			{/* Outer flame - red/orange */}
			<path
				className="flame-outer"
				d={`M80 195 C${45 - intensity * 5} 160 ${30 - intensity * 10} 120 ${50 + intensity * 5} 90 C${55 + intensity * 3} 75 ${60} 60 ${50 - intensity * 8} 40 C${65 + intensity * 5} 55 ${70} 70 ${75} 50 C${80} 30 ${90 - intensity * 5} 10 ${80} 5 C${100 + intensity * 8} 25 ${95 + intensity * 5} 55 ${100} 65 C${110 + intensity * 5} 50 ${105 - intensity * 3} 35 ${112 + intensity * 8} 40 C${105 - intensity * 5} 65 ${105} 80 ${110 + intensity * 5} 90 C${130 + intensity * 10} 120 ${115 + intensity * 5} 155 ${80} 195 Z`}
				fill="#e63000"
				opacity={opacity}
			/>

			{/* Middle flame - orange */}
			<path
				className="flame-mid"
				d={`M80 195 C${52} 165 ${42 - intensity * 5} 130 ${62 + intensity * 3} 100 C${67} 85 ${72} 72 ${65 - intensity * 5} 55 C${75 + intensity * 5} 70 ${76} 80 ${80} 62 C${84} 80 ${85 - intensity * 5} 70 ${95 + intensity * 5} 55 C${88} 72 ${93} 85 ${98 - intensity * 3} 100 C${118 + intensity * 5} 130 ${108} 165 ${80} 195 Z`}
				fill="#ff5500"
				opacity={opacity}
			/>

			{/* Inner flame - yellow-orange */}
			<path
				className="flame-inner"
				d={`M80 190 C${60} 165 ${55 - intensity * 3} 140 ${65 + intensity * 2} 115 C${70} 102 ${74} 92 ${70 - intensity * 3} 80 C${76 + intensity * 3} 92 ${78} 100 ${80} 88 C${82} 100 ${84 - intensity * 3} 92 ${90 + intensity * 3} 80 C${86} 92 ${90} 102 ${95 - intensity * 2} 115 C${105 + intensity * 3} 140 ${100} 165 ${80} 190 Z`}
				fill="#ff8800"
				opacity={opacity}
			/>

			{/* Core flame - yellow */}
			<path
				className="flame-core"
				d={`M80 185 C${68} 165 ${65 - intensity * 2} 148 ${70 + intensity} 130 C${74} 118 ${77} 110 ${75} 100 C${78 + intensity * 2} 112 ${79} 118 ${80} 108 C${81} 118 ${82 - intensity * 2} 112 ${85} 100 C${83} 110 ${86} 118 ${90 - intensity} 130 C${95 + intensity * 2} 148 ${92} 165 ${80} 185 Z`}
				fill="#ffcc00"
				opacity={opacity}
			/>

			{/* Bright tip */}
			<path
				className="flame-tip"
				d={`M80 ${108 - intensity * 15} C${77} ${118 - intensity * 10} ${75} ${128 - intensity * 5} ${80} ${138 - intensity * 8} C${85} ${128 - intensity * 5} ${83} ${118 - intensity * 10} ${80} ${108 - intensity * 15} Z`}
				fill="#fff7a0"
				opacity={0.5 + intensity * 0.5}
			/>

			{/* Ember particles */}
			{[...Array(5)].map((_, i) => (
				<circle
					key={i}
					className={`ember ember-${i}`}
					cx={55 + i * 14}
					cy={60 + (i % 3) * 20}
					r={1.5 + (i % 2)}
					fill="#ffdd00"
					opacity={0.6 + (i % 3) * 0.15}
				/>
			))}
		</svg>
	);
}

export default function Fire() {
	const [intensity, setIntensity] = useState(0.5);
	const [message, setMessage] = useState('🔥 This is fine.');
	const [sparks, setSparks] = useState([]);
	const sparkId = useRef(0);
	const animRef = useRef(null);

	const spawnSparks = (count = 5) => {
		const newSparks = Array.from({ length: count }, () => ({
			id: sparkId.current++,
			x: 50 + Math.random() * 60,
			y: 30 + Math.random() * 60,
			dx: (Math.random() - 0.5) * 60,
			dy: -(20 + Math.random() * 50),
			size: 4 + Math.random() * 6,
			color: Math.random() > 0.5 ? '#ffcc00' : '#ff6600',
		}));
		setSparks((prev) => [...prev, ...newSparks]);
		setTimeout(() => {
			setSparks((prev) => prev.filter((s) => !newSparks.find((n) => n.id === s.id)));
		}, 900);
	};

	// Flicker effect
	useEffect(() => {
		const flicker = () => {
			setIntensity((prev) => {
				const base = Math.max(0.1, Math.min(1, prev + (Math.random() - 0.5) * 0.15));
				return base;
			});
			animRef.current = setTimeout(flicker, 80 + Math.random() * 120);
		};
		animRef.current = setTimeout(flicker, 100);
		return () => clearTimeout(animRef.current);
	}, []);

	const handleStoke = () => {
		setIntensity(1);
		setMessage(FIRE_MESSAGES[Math.floor(Math.random() * FIRE_MESSAGES.length)]);
		spawnSparks(8);
		setTimeout(() => setIntensity(0.6), 1500);
	};

	const handleExtinguish = () => {
		setIntensity(0.1);
		setMessage('💧 Hissssss...');
		setTimeout(() => {
			setIntensity(0.5);
			setMessage('🔥 This is fine.');
		}, 2000);
	};

	const tempLabel = Math.round(300 + intensity * 1200);
	const tempColor = intensity < 0.4 ? '#f59e0b' : intensity < 0.7 ? '#f97316' : '#ef4444';

	return (
		<div
			className="w-full max-w-xl rounded-xl overflow-hidden border-2"
			style={{ borderColor: '#c2410c', background: 'linear-gradient(180deg, #1c0a00 0%, #2d0f00 60%, #1c0a00 100%)' }}
		>
			<style>{`
				@keyframes flame-dance {
					0%, 100% { transform: scaleX(1) skewX(0deg); }
					25% { transform: scaleX(1.05) skewX(-2deg); }
					75% { transform: scaleX(0.96) skewX(2deg); }
				}
				@keyframes flame-outer-anim {
					0%, 100% { transform: scaleY(1) scaleX(1); }
					33% { transform: scaleY(1.04) scaleX(0.97); }
					66% { transform: scaleY(0.97) scaleX(1.03); }
				}
				@keyframes ember-float {
					0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
					100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
				}
				@keyframes spark-fly {
					0% { opacity: 1; transform: translate(0,0) scale(1); }
					100% { opacity: 0; transform: translate(var(--sdx), var(--sdy)) scale(0.2); }
				}
				.flame-outer { animation: flame-outer-anim 0.6s ease-in-out infinite; transform-origin: 80px 190px; }
				.flame-mid { animation: flame-dance 0.45s ease-in-out infinite; transform-origin: 80px 190px; }
				.flame-inner { animation: flame-dance 0.35s ease-in-out infinite reverse; transform-origin: 80px 185px; }
				.flame-core { animation: flame-dance 0.28s ease-in-out infinite; transform-origin: 80px 180px; }
				.flame-tip { animation: flame-outer-anim 0.22s ease-in-out infinite reverse; transform-origin: 80px 140px; }
				.ember-0 { animation: ember-float 1.2s ease-out infinite; --dx: -15px; --dy: -40px; }
				.ember-1 { animation: ember-float 1.5s ease-out infinite 0.2s; --dx: 10px; --dy: -55px; }
				.ember-2 { animation: ember-float 1.0s ease-out infinite 0.4s; --dx: -8px; --dy: -35px; }
				.ember-3 { animation: ember-float 1.8s ease-out infinite 0.1s; --dx: 20px; --dy: -60px; }
				.ember-4 { animation: ember-float 1.3s ease-out infinite 0.6s; --dx: -5px; --dy: -45px; }
				.spark { animation: spark-fly 0.9s ease-out forwards; }
			`}</style>

			{/* Header */}
			<div style={{ padding: '16px 16px 8px', textAlign: 'center' }}>
				<h2 style={{
					fontSize: 'clamp(1.4rem, 6vw, 2rem)',
					fontWeight: '900',
					color: '#fbbf24',
					textShadow: '0 0 20px rgba(251, 191, 36, 0.6)',
					margin: 0,
					letterSpacing: '0.04em',
				}}>
					🔥 Fire 🔥
				</h2>
			</div>

			{/* Fire visual */}
			<div style={{ position: 'relative', display: 'flex', justifyContent: 'center', padding: '0 16px' }}>
				<FireSVG intensity={intensity} />

				{/* Spark particles */}
				{sparks.map((s) => (
					<div
						key={s.id}
						className="spark"
						style={{
							position: 'absolute',
							left: s.x + '%',
							top: s.y + '%',
							width: s.size,
							height: s.size,
							borderRadius: '50%',
							background: s.color,
							boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
							pointerEvents: 'none',
							'--sdx': `${s.dx}px`,
							'--sdy': `${s.dy}px`,
						}}
					/>
				))}
			</div>

			{/* Temperature gauge */}
			<div style={{ padding: '8px 20px' }}>
				<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
					<span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: '700' }}>Temperature</span>
					<span style={{ color: tempColor, fontSize: '0.75rem', fontWeight: '800' }}>{tempLabel}°C</span>
				</div>
				<div style={{ height: '8px', background: '#3f1c00', borderRadius: '999px', overflow: 'hidden' }}>
					<div style={{
						height: '100%',
						width: `${intensity * 100}%`,
						background: `linear-gradient(90deg, #fbbf24, ${tempColor})`,
						borderRadius: '999px',
						transition: 'width 0.1s ease',
					}} />
				</div>
			</div>

			{/* Message */}
			<div style={{ textAlign: 'center', padding: '6px 16px' }}>
				<p style={{
					color: '#fed7aa',
					fontSize: '0.9rem',
					fontWeight: '600',
					margin: 0,
					minHeight: '1.4rem',
					fontFamily: 'Comic Sans MS, cursive',
				}}>
					{message}
				</p>
			</div>

			{/* Buttons */}
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '12px 16px 16px' }}>
				<button
					onClick={handleStoke}
					style={{
						background: 'linear-gradient(135deg, #dc2626, #f97316)',
						border: 'none',
						borderRadius: '10px',
						padding: '12px',
						color: '#fff',
						fontWeight: '800',
						fontSize: '0.95rem',
						cursor: 'pointer',
						boxShadow: '0 0 12px rgba(249, 115, 22, 0.5)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '6px',
						transition: 'transform 0.1s',
					}}
					onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
					onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
					onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
					onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
				>
					<span>🔥</span> Stoke
				</button>
				<button
					onClick={handleExtinguish}
					style={{
						background: 'linear-gradient(135deg, #1d4ed8, #06b6d4)',
						border: 'none',
						borderRadius: '10px',
						padding: '12px',
						color: '#fff',
						fontWeight: '800',
						fontSize: '0.95rem',
						cursor: 'pointer',
						boxShadow: '0 0 12px rgba(6, 182, 212, 0.4)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '6px',
						transition: 'transform 0.1s',
					}}
					onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
					onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
					onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
					onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
				>
					<span>💧</span> Douse
				</button>
			</div>
		</div>
	);
}
