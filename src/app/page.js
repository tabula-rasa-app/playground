import WorldcoinTicker from '@/components/WorldcoinTicker';
import SolarSystem from '@/components/SolarSystem';
import ShareButton from '@/components/ShareButton';

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col bg-pink-100 font-sans">
			<WorldcoinTicker />
			<div className="flex flex-1 items-center justify-center">
				<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-4 sm:px-16 bg-pink-50 sm:items-start">
				<div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
					{/* Solar System - Travel through the galaxy */}
					<SolarSystem />
					{/* Black Cat SVG */}
					<svg
						width="150"
						height="150"
						viewBox="0 0 150 150"
						xmlns="http://www.w3.org/2000/svg"
						className="mb-4 dancing-cat"
					>
						{/* Cat body */}
						<ellipse cx="75" cy="90" rx="35" ry="40" fill="#000" />
						{/* Cat head */}
						<circle cx="75" cy="50" r="30" fill="#000" />
						{/* Left ear */}
						<polygon points="55,25 50,5 65,30" fill="#000" />
						{/* Right ear */}
						<polygon points="95,25 100,5 85,30" fill="#000" />
						{/* Inner left ear */}
						<polygon points="58,26 56,12 64,28" fill="#ff69b4" />
						{/* Inner right ear */}
						<polygon points="92,26 94,12 86,28" fill="#ff69b4" />
						{/* Left eye */}
						<ellipse cx="65" cy="48" rx="6" ry="10" fill="#90EE90" />
						<ellipse cx="65" cy="50" rx="3" ry="6" fill="#000" />
						{/* Right eye */}
						<ellipse cx="85" cy="48" rx="6" ry="10" fill="#90EE90" />
						<ellipse cx="85" cy="50" rx="3" ry="6" fill="#000" />
						{/* Nose */}
						<polygon points="75,58 72,62 78,62" fill="#ff69b4" />
						{/* Mouth */}
						<path d="M 75 62 Q 70 66 68 64 M 75 62 Q 80 66 82 64" stroke="#000" strokeWidth="2" fill="none" />
						{/* Whiskers left */}
						<line x1="45" y1="52" x2="60" y2="52" stroke="#000" strokeWidth="1.5" />
						<line x1="45" y1="56" x2="60" y2="54" stroke="#000" strokeWidth="1.5" />
						<line x1="45" y1="60" x2="60" y2="56" stroke="#000" strokeWidth="1.5" />
						{/* Whiskers right */}
						<line x1="105" y1="52" x2="90" y2="52" stroke="#000" strokeWidth="1.5" />
						<line x1="105" y1="56" x2="90" y2="54" stroke="#000" strokeWidth="1.5" />
						<line x1="105" y1="60" x2="90" y2="56" stroke="#000" strokeWidth="1.5" />
						{/* Tail */}
						<path d="M 105 100 Q 120 90 125 75 Q 128 65 125 60" stroke="#000" strokeWidth="12" fill="none" strokeLinecap="round" />
						{/* Left paw */}
						<ellipse cx="60" cy="125" rx="8" ry="10" fill="#000" />
						{/* Right paw */}
						<ellipse cx="90" cy="125" rx="8" ry="10" fill="#000" />
					</svg>
					<svg
						width="200"
						height="200"
						viewBox="0 0 200 200"
						xmlns="http://www.w3.org/2000/svg"
						className="mb-4"
					>
						<rect x="50" y="40" width="100" height="120" fill="#da291c" />
						<rect x="50" y="80" width="100" height="80" fill="#fff" />
						<rect x="50" y="120" width="100" height="40" fill="#241d4f" />
						<circle cx="100" cy="60" r="15" fill="#ffd700" />
						<path d="M 100 60 L 105 65 L 110 62 L 108 68 L 113 72 L 107 73 L 105 79 L 100 75 L 95 79 L 93 73 L 87 72 L 92 68 L 90 62 L 95 65 Z" fill="#da291c" />
						<path d="M 60 150 Q 70 160 80 155 Q 85 165 100 165 Q 115 165 120 155 Q 130 160 140 150" stroke="#4a90e2" strokeWidth="2" fill="none" />
						<path d="M 55 170 Q 75 180 100 175 Q 125 180 145 170" stroke="#4a90e2" strokeWidth="2" fill="none" />
					</svg>
					<h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-pink-900">
						Tabula rasa
					</h1>
					<p className="text-lg text-pink-700">Change anything you want</p>
					<p className="text-base text-pink-600 max-w-xl leading-relaxed">
						Anyone can change anything on this page: text, colors, layout—you name it.
						Creativity matters most. The idea with the most votes will win, and AI will
						update the page accordingly. For example, change the text of your poem,
						reimagine the color scheme, or redesign the entire experience.
					</p>
					<div className="mt-6">
						<ShareButton />
					</div>
					<div className="mt-8 p-6 bg-pink-200 rounded-lg border-2 border-pink-300 max-w-xl">
						<h2 className="text-2xl font-bold text-pink-900 mb-4 text-center">Come to Thailand</h2>
						<div className="text-pink-800 leading-relaxed space-y-2">
							<p>Baby come to Thailand, where the sun shines bright,</p>
							<p>Golden temples gleaming in the morning light,</p>
							<p>Beaches white as diamonds, waters crystal clear,</p>
							<p>A paradise awaits you, come and visit here.</p>
							<p className="mt-4">Taste the pad thai cooking, smell the lemongrass,</p>
							<p>Dance through floating markets, memories that last,</p>
							<p>From Bangkok to the islands, adventures never end,</p>
							<p>Thailand's warmth and beauty, like an old dear friend.</p>
							<p className="mt-4">Baby come to Thailand, let your spirit soar,</p>
							<p>Where smiles are given freely, and there's always more,</p>
							<p>The land of endless wonders, culture rich and true,</p>
							<p>Thailand's calling softly, it's waiting here for you!</p>
						</div>
					</div>
				</div>
			</main>
			</div>
		</div>
	);
}
