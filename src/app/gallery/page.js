import CheetosRain from '@/components/CheetosRain';
import WorldcoinTicker from '@/components/WorldcoinTicker';

export default function Gallery() {
	return (
		<div className="flex min-h-screen flex-col bg-transparent font-sans">
			<CheetosRain />
			<WorldcoinTicker />
			<div className="flex flex-1 items-center justify-center">
				<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-16 px-4 sm:px-16 bg-white/30 backdrop-blur-sm">
					<div className="flex flex-col items-center gap-6 w-full">
						<h1 className="text-4xl font-bold text-amber-900 mb-6">Gallery</h1>

						{/* Black Cat SVG */}
						<div className="p-6 bg-purple-50/80 rounded-lg border-2 border-purple-300 w-full max-w-xl">
							<h2 className="text-2xl font-bold text-purple-900 mb-4 text-center">Dancing Black Cat</h2>
							<div className="flex justify-center">
								<svg
									width="150"
									height="150"
									viewBox="0 0 150 150"
									xmlns="http://www.w3.org/2000/svg"
									className="dancing-cat"
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
							</div>
						</div>

						{/* Flag SVG */}
						<div className="p-6 bg-indigo-50/80 rounded-lg border-2 border-indigo-300 w-full max-w-xl">
							<h2 className="text-2xl font-bold text-indigo-900 mb-4 text-center">Flag</h2>
							<div className="flex justify-center">
								<svg
									width="200"
									height="200"
									viewBox="0 0 200 200"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect x="50" y="40" width="100" height="120" fill="#da291c" />
									<rect x="50" y="80" width="100" height="80" fill="#fff" />
									<rect x="50" y="120" width="100" height="40" fill="#241d4f" />
									<circle cx="100" cy="60" r="15" fill="#ffd700" />
									<path d="M 100 60 L 105 65 L 110 62 L 108 68 L 113 72 L 107 73 L 105 79 L 100 75 L 95 79 L 93 73 L 87 72 L 92 68 L 90 62 L 95 65 Z" fill="#da291c" />
									<path d="M 60 150 Q 70 160 80 155 Q 85 165 100 165 Q 115 165 120 155 Q 130 160 140 150" stroke="#4a90e2" strokeWidth="2" fill="none" />
									<path d="M 55 170 Q 75 180 100 175 Q 125 180 145 170" stroke="#4a90e2" strokeWidth="2" fill="none" />
								</svg>
							</div>
						</div>

						{/* Dog Image */}
						<div className="p-6 bg-blue-50/70 rounded-lg border-2 border-blue-300 max-w-xl w-full">
							<h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">Perro Pitbull</h2>
							<div className="flex justify-center">
								<img
									src="https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800&auto=format&fit=crop&q=80"
									alt="Perro Pitbull"
									className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
								/>
							</div>
							<p className="text-blue-800 leading-relaxed mt-4 text-center">
								Un hermoso perro Pitbull, conocido por su lealtad y fuerza.
							</p>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
