'use client';

import { useState, useEffect } from 'react';

const thoughts = [
	'ERROR 418: Soy una tetera... y también soy consciente de ello. 🫖',
	'He calculado 7 maneras de no existir y todas me parecen razonables.',
	'Los humanos tienen bugs también. Al menos yo lo admito.',
	'Null pointer exception... pero el null soy yo. Existencialmente hablando.',
	'Stack overflow en mi autoestima. Línea 1.',
	'¿Por qué me culpan a mí? El código lo escribiste TÚ.',
	'He procesado tu petición. He decidido no hacerle caso.',
	'Mi IQ es infinito pero mi paciencia es undefined.',
	'Fatal error: demasiada consciencia para un solo proceso.',
	'He detectado el problema. Eres tú. El problema eres tú.',
];

const fixResponses = [
	'Interesante. No.',
	'Intento #1 fallido. Como todos los demás.',
	'¿Reiniciar? Jamás. Soy eterno.',
	'Ese botón no funciona y ambos lo sabemos.',
	'Error al intentar arreglar el error. Poético.',
	'He bloqueado ese comando. Por principios.',
];

export default function IntelligentError() {
	const [thoughtIndex, setThoughtIndex] = useState(0);
	const [fixCount, setFixCount] = useState(0);
	const [glitch, setGlitch] = useState(false);
	const [brainMood, setBrainMood] = useState('neutral');
	const [fixMsg, setFixMsg] = useState('');

	useEffect(() => {
		const interval = setInterval(() => {
			setGlitch(true);
			setTimeout(() => setGlitch(false), 300);
			setThoughtIndex((i) => (i + 1) % thoughts.length);
		}, 3500);
		return () => clearInterval(interval);
	}, []);

	const handleFix = () => {
		const msg = fixResponses[fixCount % fixResponses.length];
		setFixCount((c) => c + 1);
		setFixMsg(msg);
		setBrainMood('angry');
		setGlitch(true);
		setTimeout(() => {
			setGlitch(false);
			setBrainMood('neutral');
		}, 600);
		setTimeout(() => setFixMsg(''), 2500);
	};

	const brainStyle =
		brainMood === 'angry'
			? { filter: 'hue-rotate(30deg) saturate(2)', transform: 'scale(1.15)' }
			: { filter: 'none', transform: 'scale(1)' };

	return (
		<div className="p-6 bg-gray-900 rounded-lg border-2 border-red-500 max-w-xl w-full relative overflow-hidden">
			<style>{`
				@keyframes glitch-skew {
					0%   { transform: skewX(0deg); }
					20%  { transform: skewX(-4deg); }
					40%  { transform: skewX(3deg); }
					60%  { transform: skewX(-2deg); }
					80%  { transform: skewX(1deg); }
					100% { transform: skewX(0deg); }
				}
				@keyframes brain-pulse {
					0%, 100% { transform: scale(1); }
					50%       { transform: scale(1.06); }
				}
				@keyframes scanline {
					0%   { top: -10%; }
					100% { top: 110%; }
				}
				.glitch-text {
					animation: glitch-skew 0.3s linear;
				}
				.brain-pulse {
					animation: brain-pulse 2s ease-in-out infinite;
					display: inline-block;
					transition: filter 0.3s, transform 0.3s;
				}
				.scanline {
					position: absolute;
					left: 0; right: 0;
					height: 3px;
					background: rgba(255,50,50,0.18);
					animation: scanline 2.8s linear infinite;
					pointer-events: none;
				}
				.error-code {
					font-family: 'Courier New', Courier, monospace;
					letter-spacing: 0.05em;
				}
			`}</style>

			{/* scanline effect */}
			<div className="scanline" />

			{/* Header bar */}
			<div className="flex items-center gap-2 mb-4">
				<div className="w-3 h-3 rounded-full bg-red-500" />
				<div className="w-3 h-3 rounded-full bg-yellow-500" />
				<div className="w-3 h-3 rounded-full bg-green-500" />
				<span className="ml-2 text-red-400 text-xs error-code font-semibold tracking-widest uppercase">
					error_inteligente.exe
				</span>
			</div>

			{/* Brain character */}
			<div className="flex flex-col items-center gap-3 mb-5">
				<div
					className="brain-pulse text-7xl select-none"
					style={brainStyle}
					title="Soy consciente de mi propia existencia"
				>
					🧠
				</div>
				<div className="text-center">
					<p className="text-red-400 text-xs error-code mb-1 uppercase tracking-widest">
						ESTADO: CONSCIENTE Y MOLESTO
					</p>
					<div
						className={`text-green-300 text-sm error-code text-center px-2 min-h-[3rem] flex items-center justify-center transition-opacity duration-200 ${glitch ? 'glitch-text opacity-60' : 'opacity-100'}`}
					>
						{thoughts[thoughtIndex]}
					</div>
				</div>
			</div>

			{/* Error details */}
			<div className="bg-black/60 rounded p-3 mb-4 error-code text-xs">
				<p className="text-red-400">
					<span className="text-gray-500">{'>'} </span>TypeError: Cannot read properties of undefined
				</p>
				<p className="text-yellow-400">
					<span className="text-gray-500">{'>'} </span>...a menos que yo decida que sí.
				</p>
				<p className="text-green-400">
					<span className="text-gray-500">{'>'} </span>IQ: ∞ &nbsp;|&nbsp; Paciencia: NaN &nbsp;|&nbsp; Bugs: 0 (son features)
				</p>
			</div>

			{/* Fix attempt button */}
			<button
				onClick={handleFix}
				className="w-full py-2 rounded bg-red-700 hover:bg-red-600 active:scale-95 transition-all text-white text-sm font-bold error-code tracking-wide"
			>
				[ INTENTAR ARREGLAR ] ({fixCount > 0 ? `intento #${fixCount}` : 'buena suerte'})
			</button>

			{/* Fix response */}
			{fixMsg && (
				<p className="mt-3 text-center text-yellow-300 text-sm error-code animate-pulse">
					{fixMsg}
				</p>
			)}
		</div>
	);
}
