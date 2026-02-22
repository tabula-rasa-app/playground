import CheetosRain from '@/components/CheetosRain';
import WorldcoinTicker from '@/components/WorldcoinTicker';
import GlobalCounter from '@/components/GlobalCounter';
import VisitorOfTheDay from '@/components/VisitorOfTheDay';
import LotteryGenerator from '@/components/LotteryGenerator';
import SolarSystem from '@/components/SolarSystem';
import CorvetteDrive from '@/components/CorvetteDrive';
import ChickenCrossing from '@/components/ChickenCrossing';
import FlappyNails from '@/components/FlappyNails';
import Caminar from '@/components/Caminar';
import AIMiner from '@/components/AIMiner';
import ShareButton from '@/components/ShareButton';

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col bg-transparent font-sans">
			<CheetosRain />
			<WorldcoinTicker />
			<div className="relative z-10 flex flex-1 justify-center">
				<main className="w-full max-w-3xl flex flex-col items-center py-8 px-4">
					<div className="flex flex-col items-center gap-8 w-full">
						<GlobalCounter />
						<AIMiner />
						<VisitorOfTheDay />
						<LotteryGenerator />
						<Caminar />
						<CorvetteDrive />
						<ChickenCrossing />
						<FlappyNails />
						<SolarSystem />
						<ShareButton />
					</div>
				</main>
			</div>
		</div>
	);
}
