'use client';

import { useState } from 'react';

const WINES = [
	{
		id: 'rouge',
		name: 'Rouge',
		label: 'Red Wine',
		color: '#8B1A1A',
		fillColor: '#C0392B',
		shimmer: '#e74c3c',
		bg: 'bg-red-50/80',
		border: 'border-red-300',
		text: 'text-red-900',
		sub: 'text-red-700',
		notes: ['Cherry', 'Oak', 'Vanilla'],
		desc: 'Rich and bold with dark fruit flavors.',
		pair: 'Steak, aged cheese, or lamb.',
	},
	{
		id: 'blanc',
		name: 'Blanc',
		label: 'White Wine',
		color: '#B8A060',
		fillColor: '#F0C040',
		shimmer: '#F5D060',
		bg: 'bg-yellow-50/80',
		border: 'border-yellow-300',
		text: 'text-yellow-900',
		sub: 'text-yellow-700',
		notes: ['Citrus', 'Apple', 'Honey'],
		desc: 'Crisp and refreshing with floral hints.',
		pair: 'Seafood, soft cheese, or salads.',
	},
	{
		id: 'rose',
		name: 'Rose',
		label: 'Rose Wine',
		color: '#C05070',
		fillColor: '#E88090',
		shimmer: '#F4A0B0',
		bg: 'bg-pink-50/80',
		border: 'border-pink-300',
		text: 'text-pink-900',
		sub: 'text-pink-700',
		notes: ['Strawberry', 'Peach', 'Floral'],
		desc: 'Light and playful with summer berry notes.',
		pair: 'Grilled vegetables, light pasta, or sushi.',
	},
	{
		id: 'bubbly',
		name: 'Bulles',
		label: 'Sparkling',
		color: '#8090A8',
		fillColor: '#C0D0E8',
		shimmer: '#E0EEFF',
		bg: 'bg-blue-50/80',
		border: 'border-blue-300',
		text: 'text-blue-900',
		sub: 'text-blue-700',
		notes: ['Yeast', 'Pear', 'Toast'],
		desc: 'Elegant and festive with lively bubbles.',
		pair: 'Oysters, caviar, or any celebration.',
	},
];

function WineGlass({ wine, poured, bubbling }) {
	const fillHeight = poured ? 54 : 0;
	const fillY = 108 - fillHeight;

	return (
		<svg
			width="100"
			height="180"
			viewBox="0 0 100 180"
			xmlns="http://www.w3.org/2000/svg"
			aria-label={`Glass of ${wine.label}`}
		>
			{/* Glass bowl outline */}
			<path
				d="M25 20 Q20 60 30 90 Q38 115 50 120 Q62 115 70 90 Q80 60 75 20 Z"
				fill="rgba(200,220,255,0.15)"
				stroke="#aaa"
				strokeWidth="2"
			/>

			{/* Wine fill - clipped to bowl shape */}
			<clipPath id={`bowl-clip-${wine.id}`}>
				<path d="M25 20 Q20 60 30 90 Q38 115 50 120 Q62 115 70 90 Q80 60 75 20 Z" />
			</clipPath>
			<rect
				x="20"
				y={fillY}
				width="60"
				height={fillHeight + 10}
				fill={wine.fillColor}
				clipPath={`url(#bowl-clip-${wine.id})`}
				style={{ transition: 'y 0.8s ease, height 0.8s ease' }}
				opacity="0.85"
			/>

			{/* Shimmer on wine surface */}
			{poured && (
				<ellipse
					cx="45"
					cy={fillY + 4}
					rx="10"
					ry="3"
					fill={wine.shimmer}
					opacity="0.5"
					clipPath={`url(#bowl-clip-${wine.id})`}
				/>
			)}

			{/* Bubbles for sparkling */}
			{poured && bubbling && wine.id === 'bubbly' && (
				<g clipPath={`url(#bowl-clip-${wine.id})`}>
					<circle cx="43" cy={fillY + 30} r="2" fill="white" opacity="0.7">
						<animate attributeName="cy" values={`${fillY + 50};${fillY + 5}`} dur="1.2s" repeatCount="indefinite" />
						<animate attributeName="opacity" values="0.7;0" dur="1.2s" repeatCount="indefinite" />
					</circle>
					<circle cx="52" cy={fillY + 20} r="1.5" fill="white" opacity="0.6">
						<animate attributeName="cy" values={`${fillY + 45};${fillY + 8}`} dur="1.5s" repeatCount="indefinite" />
						<animate attributeName="opacity" values="0.6;0" dur="1.5s" repeatCount="indefinite" />
					</circle>
					<circle cx="47" cy={fillY + 40} r="1" fill="white" opacity="0.5">
						<animate attributeName="cy" values={`${fillY + 55};${fillY + 10}`} dur="1s" repeatCount="indefinite" />
						<animate attributeName="opacity" values="0.5;0" dur="1s" repeatCount="indefinite" />
					</circle>
				</g>
			)}

			{/* Glass bowl outline overlay (on top of fill) */}
			<path
				d="M25 20 Q20 60 30 90 Q38 115 50 120 Q62 115 70 90 Q80 60 75 20 Z"
				fill="none"
				stroke="#999"
				strokeWidth="2"
			/>

			{/* Glass shine */}
			<path
				d="M33 30 Q31 55 34 75"
				stroke="rgba(255,255,255,0.6)"
				strokeWidth="3"
				fill="none"
				strokeLinecap="round"
			/>

			{/* Stem */}
			<rect x="47" y="120" width="6" height="40" rx="3" fill="#bbb" />

			{/* Base */}
			<ellipse cx="50" cy="163" rx="22" ry="6" fill="#ccc" stroke="#aaa" strokeWidth="1" />
		</svg>
	);
}

export default function VinTasting() {
	const [selected, setSelected] = useState(WINES[0]);
	const [poured, setPoured] = useState(false);
	const [pouring, setPouring] = useState(false);
	const [tasted, setTasted] = useState(false);
	const [rating, setRating] = useState(0);

	function selectWine(wine) {
		if (wine.id === selected.id) return;
		setSelected(wine);
		setPoured(false);
		setPouring(false);
		setTasted(false);
		setRating(0);
	}

	function pour() {
		if (poured || pouring) return;
		setPouring(true);
		setTimeout(() => {
			setPoured(true);
			setPouring(false);
		}, 900);
	}

	function taste() {
		if (!poured || tasted) return;
		setTasted(true);
	}

	return (
		<div className={`p-6 ${selected.bg} rounded-xl border-2 ${selected.border} w-full max-w-xl`}>
			<h2 className={`text-2xl font-bold ${selected.text} mb-1 text-center`}>Vin</h2>
			<p className={`${selected.sub} text-sm text-center mb-4`}>
				A little wine for the soul
			</p>

			{/* Wine selector */}
			<div className="flex justify-center gap-2 mb-5 flex-wrap">
				{WINES.map((w) => (
					<button
						key={w.id}
						onClick={() => selectWine(w)}
						className={`px-3 py-1.5 rounded-full text-sm font-semibold border-2 transition-all ${
							selected.id === w.id
								? `text-white border-transparent`
								: `bg-white/60 border-gray-300 text-gray-700`
						}`}
						style={selected.id === w.id ? { background: w.color, borderColor: w.color } : {}}
					>
						{w.name}
					</button>
				))}
			</div>

			{/* Glass display */}
			<div className="flex flex-col items-center gap-3">
				<div
					className={`cursor-pointer transition-transform active:scale-95 ${!poured && !pouring ? 'hover:scale-105' : ''}`}
					onClick={pour}
					role="button"
					aria-label={poured ? `Glass of ${selected.label}` : `Pour ${selected.label}`}
					title={poured ? selected.label : `Tap to pour`}
				>
					<WineGlass wine={selected} poured={poured} bubbling={true} />
				</div>

				{!poured && !pouring && (
					<p className={`text-sm ${selected.sub} text-center`}>
						Tap the glass to pour
					</p>
				)}
				{pouring && (
					<p className={`text-sm ${selected.sub} text-center italic`}>
						Pouring...
					</p>
				)}
				{poured && !tasted && (
					<button
						onClick={taste}
						className={`px-5 py-2 rounded-full font-semibold text-white text-sm shadow-md transition-transform active:scale-95`}
						style={{ background: selected.color }}
					>
						Taste &amp; Rate
					</button>
				)}
			</div>

			{/* Tasting notes */}
			{poured && (
				<div className="mt-4">
					<p className={`text-sm font-semibold ${selected.text} mb-2 text-center`}>
						{selected.label} &mdash; {selected.desc}
					</p>
					<div className="flex justify-center gap-2 flex-wrap mb-2">
						{selected.notes.map((note) => (
							<span
								key={note}
								className="px-2 py-0.5 rounded-full text-xs text-white font-medium"
								style={{ background: selected.color }}
							>
								{note}
							</span>
						))}
					</div>
					<p className={`text-xs ${selected.sub} text-center`}>
						Pairs with: {selected.pair}
					</p>
				</div>
			)}

			{/* Rating */}
			{tasted && (
				<div className="mt-4 flex flex-col items-center gap-2">
					<p className={`text-sm font-semibold ${selected.text}`}>Your rating:</p>
					<div className="flex gap-1">
						{[1, 2, 3, 4, 5].map((star) => (
							<button
								key={star}
								onClick={() => setRating(star)}
								className="text-2xl transition-transform active:scale-125"
								aria-label={`Rate ${star} stars`}
							>
								<span style={{ color: star <= rating ? '#f59e0b' : '#d1d5db' }}>&#9733;</span>
							</button>
						))}
					</div>
					{rating > 0 && (
						<p className={`text-sm ${selected.sub} text-center`}>
							{rating === 5
								? 'Magnifique! A perfect glass.'
								: rating === 4
								? 'Tres bien! Excellent choice.'
								: rating === 3
								? 'Pas mal. A decent pour.'
								: rating === 2
								? 'Hmm, perhaps another variety?'
								: 'Not your glass. Try another!'}
						</p>
					)}
				</div>
			)}
		</div>
	);
}
