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
						<ellipse cx="100" cy="120" rx="60" ry="50" fill="#ffc0cb" />
						<circle cx="100" cy="70" rx="45" ry="40" fill="#ffc0cb" />
						<ellipse cx="65" cy="145" rx="12" ry="35" fill="#ffc0cb" />
						<ellipse cx="90" cy="145" rx="12" ry="35" fill="#ffc0cb" />
						<ellipse cx="110" cy="145" rx="12" ry="35" fill="#ffc0cb" />
						<ellipse cx="135" cy="145" rx="12" ry="35" fill="#ffc0cb" />
						<path d="M 60 40 Q 50 20 40 30 Q 45 45 60 50 Z" fill="#ff69b4" />
						<path d="M 140 40 Q 150 20 160 30 Q 155 45 140 50 Z" fill="#ff69b4" />
						<circle cx="85" cy="70" r="5" fill="#000" />
						<circle cx="115" cy="70" r="5" fill="#000" />
						<path d="M 90 85 Q 100 90 110 85" stroke="#000" strokeWidth="2" fill="none" />
						<path d="M 60 25 Q 65 10 70 25 Q 75 10 80 25 Q 85 10 90 25" stroke="#ff1493" strokeWidth="3" fill="none" />
						<path d="M 150 100 Q 160 95 170 100 L 175 140 Q 165 135 155 140 Z" fill="#ff69b4" />
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
				</div>
			</main>
			</div>
		</div>
	);
}
