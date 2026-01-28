import WorldcoinTicker from '@/components/WorldcoinTicker';
import SolarSystem from '@/components/SolarSystem';
import ShareButton from '@/components/ShareButton';
import CheetosRain from '@/components/CheetosRain';
import LotteryGenerator from '@/components/LotteryGenerator';
import CorvetteDrive from '@/components/CorvetteDrive';
import GlobalCounter from '@/components/GlobalCounter';
import VisitorOfTheDay from '@/components/VisitorOfTheDay';

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col bg-transparent font-sans">
			<CheetosRain />
			<WorldcoinTicker />
			<div className="flex flex-1 items-center justify-center">
				<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-16 px-4 sm:px-16 bg-white/30 backdrop-blur-sm sm:items-start">
					<div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
						{/* Corvette Drive - Watch the Corvette race */}
						<CorvetteDrive />

						{/* Global Click Counter */}
						<GlobalCounter />

						{/* Visitor of the Day */}
						<VisitorOfTheDay />

						{/* Solar System - Travel through the galaxy */}
						<SolarSystem />
						<h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-amber-900">
							Tabula rasa
						</h1>
						<p className="text-lg text-orange-700">Change anything you want</p>
						<p className="text-base text-amber-800 max-w-xl leading-relaxed">
							Anyone can change anything on this page: text, colors, layout—you name it.
							Creativity matters most. The idea with the most votes will win, and AI will
							update the page accordingly. For example, change the text of your poem,
							reimagine the color scheme, or redesign the entire experience.
						</p>

						{/* Lottery Generator */}
						<div className="w-full mt-8">
							<LotteryGenerator />
						</div>

						<div className="mt-6">
							<ShareButton />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
