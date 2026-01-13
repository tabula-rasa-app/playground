import WorldcoinTicker from '@/components/WorldcoinTicker';

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col bg-pink-100 font-sans">
			<WorldcoinTicker />
			<div className="flex flex-1 items-center justify-center">
				<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-pink-50 sm:items-start">
				<div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
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
