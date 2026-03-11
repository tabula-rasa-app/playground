'use client';

import { useState, useEffect, useRef } from 'react';

const BAGUS_MESSAGES = [
	{ text: 'Kamu luar biasa!', sub: '¡Eres extraordinario/a!' },
	{ text: 'Tetap semangat!', sub: '¡Mantén el ánimo!' },
	{ text: 'Kamu bisa!', sub: '¡Tú puedes!' },
	{ text: 'Hebat sekali!', sub: '¡Increíble!' },
	{ text: 'Terus maju!', sub: '¡Sigue adelante!' },
	{ text: 'Kamu keren!', sub: '¡Eres genial!' },
	{ text: 'Jangan menyerah!', sub: '¡No te rindas!' },
	{ text: 'Luar biasa!', sub: '¡Extraordinario!' },
	{ text: 'Mantap jiwa!', sub: '¡Absolutamente genial!' },
	{ text: 'Top banget!', sub: '¡De primera!' },
	{ text: 'Kerja bagus!', sub: '¡Buen trabajo!' },
	{ text: 'Kamu membanggakan!', sub: '¡Nos llenas de orgullo!' },
];

const STAR_COLORS = ['#FFD700', '#FF6B6B', '#4ECDC4', '#A855F7', '#F97316', '#22C55E'];

function StarBurst({ stars }) {
	return (
		<>
			{stars.map((s) => (
				<div
					key={s.id}
					style={{
						position: 'absolute',
						left: `${s.x}%`,
						top: `${s.y}%`,
						fontSize: `${s.size}rem`,
						color: s.color,
						pointerEvents: 'none',
						animation: 'bagus-star-fly 1s ease-out forwards',
						'--sdx': `${s.dx}px`,
						'--sdy': `${s.dy}px`,
						zIndex: 10,
					}}
				>
					{s.shape}
				</div>
			))}
		</>
	);
}

export default function Bagus() {
	const [msgIndex, setMsgIndex] = useState(0);
	const [stars, setStars] = useState([]);
	const [pulse, setPulse] = useState(false);
	const starId = useRef(0);

	const spawnStars = () => {
		const shapes = ['⭐', '✨', '🌟', '💫', '⚡'];
		const newStars = Array.from({ length: 12 }, () => ({
			id: starId.current++,
			x: 30 + Math.random() * 40,
			y: 20 + Math.random() * 50,
			dx: (Math.random() - 0.5) * 120,
			dy: -(30 + Math.random() * 80),
			size: 0.9 + Math.random() * 0.8,
			color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
			shape: shapes[Math.floor(Math.random() * shapes.length)],
		}));
		setStars((prev) => [...prev, ...newStars]);
		setTimeout(() => {
			setStars((prev) => prev.filter((s) => !newStars.find((n) => n.id === s.id)));
		}, 1000);
	};

	const handleBagus = () => {
		const next = (msgIndex + 1 + Math.floor(Math.random() * (BAGUS_MESSAGES.length - 1))) % BAGUS_MESSAGES.length;
		setMsgIndex(next);
		setPulse(true);
		spawnStars();
		setTimeout(() => setPulse(false), 600);
	};

	return (
		<div
			className="w-full max-w-xl rounded-xl overflow-hidden border-2"
			style={{ borderColor: '#ce1126', background: 'linear-gradient(160deg, #fff 0%, #fff5f5 50%, #fff 100%)' }}
		>
			<style>{`
				@keyframes bagus-bounce {
					0%, 100% { transform: scale(1); }
					30% { transform: scale(1.18); }
					60% { transform: scale(0.95); }
					80% { transform: scale(1.06); }
				}
				@keyframes bagus-star-fly {
					0% { opacity: 1; transform: translate(0, 0) scale(1) rotate(0deg); }
					100% { opacity: 0; transform: translate(var(--sdx), var(--sdy)) scale(0.2) rotate(360deg); }
				}
				@keyframes bagus-flag-stripe {
					0%, 100% { transform: scaleX(1); }
					50% { transform: scaleX(1.04); }
				}
				@keyframes bagus-text-in {
					0% { opacity: 0; transform: translateY(10px) scale(0.9); }
					100% { opacity: 1; transform: translateY(0) scale(1); }
				}
				@keyframes bagus-shimmer {
					0% { background-position: -200% center; }
					100% { background-position: 200% center; }
				}
				.bagus-pulse { animation: bagus-bounce 0.6s ease-out; }
				.bagus-msg { animation: bagus-text-in 0.35s ease-out both; }
				.bagus-title {
					background: linear-gradient(90deg, #ce1126, #ffd700, #ce1126, #ffd700);
					background-size: 300% auto;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
					animation: bagus-shimmer 3s linear infinite;
				}
				.bagus-btn {
					transition: transform 0.12s ease, box-shadow 0.12s ease;
					cursor: pointer;
				}
				.bagus-btn:active {
					transform: scale(0.93) !important;
				}
			`}</style>

			{/* Indonesian flag stripe header */}
			<div style={{ display: 'flex', height: '10px' }}>
				<div style={{ flex: 1, background: '#ce1126', animation: 'bagus-flag-stripe 2s ease-in-out infinite' }} />
				<div style={{ flex: 1, background: '#ffffff', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }} />
			</div>

			{/* Title */}
			<div style={{ padding: '20px 16px 8px', textAlign: 'center' }}>
				<div style={{ fontSize: '2.8rem', marginBottom: '4px' }}>🇮🇩</div>
				<h2
					className="bagus-title"
					style={{
						fontSize: 'clamp(2rem, 9vw, 3rem)',
						fontWeight: '900',
						margin: '0 0 4px',
						letterSpacing: '0.08em',
						fontFamily: 'Georgia, serif',
					}}
				>
					BAGUS!
				</h2>
				<p style={{ color: '#9ca3af', fontSize: '0.75rem', margin: 0, fontWeight: '600', letterSpacing: '0.12em' }}>
					IMPULSO DE POSITIVIDAD INDONESIO
				</p>
			</div>

			{/* Message display */}
			<div
				style={{
					position: 'relative',
					margin: '12px 16px',
					padding: '24px 16px',
					background: 'linear-gradient(135deg, #fff5f5, #fff9f0)',
					border: '2px solid #fecaca',
					borderRadius: '14px',
					textAlign: 'center',
					minHeight: '110px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					overflow: 'hidden',
				}}
			>
				<StarBurst stars={stars} />

				<p
					key={msgIndex}
					className={`bagus-msg ${pulse ? 'bagus-pulse' : ''}`}
					style={{
						fontSize: 'clamp(1.4rem, 7vw, 2rem)',
						fontWeight: '900',
						color: '#ce1126',
						margin: '0 0 8px',
						lineHeight: 1.2,
					}}
				>
					{BAGUS_MESSAGES[msgIndex].text}
				</p>
				<p
					key={`sub-${msgIndex}`}
					className="bagus-msg"
					style={{
						fontSize: 'clamp(0.82rem, 4vw, 1rem)',
						color: '#b45309',
						margin: 0,
						fontStyle: 'italic',
						animationDelay: '0.1s',
					}}
				>
					{BAGUS_MESSAGES[msgIndex].sub}
				</p>
			</div>

			{/* Tap button */}
			<div style={{ padding: '8px 16px 20px', display: 'flex', justifyContent: 'center' }}>
				<button
					className="bagus-btn"
					onClick={handleBagus}
					style={{
						background: 'linear-gradient(135deg, #ce1126 0%, #ff4d4d 50%, #ce1126 100%)',
						border: 'none',
						borderRadius: '999px',
						padding: '14px 40px',
						color: '#fff',
						fontWeight: '900',
						fontSize: 'clamp(1rem, 5vw, 1.2rem)',
						letterSpacing: '0.06em',
						boxShadow: '0 4px 20px rgba(206, 17, 38, 0.45)',
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
					}}
					onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.93)')}
					onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
					onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(0.93)')}
					onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
				>
					<span>⭐</span>
					<span>Bagus!</span>
					<span>⭐</span>
				</button>
			</div>

			{/* Bottom flag stripe */}
			<div style={{ display: 'flex', height: '10px' }}>
				<div style={{ flex: 1, background: '#ce1126' }} />
				<div style={{ flex: 1, background: '#ffffff', borderTop: '1px solid #eee' }} />
			</div>
		</div>
	);
}
