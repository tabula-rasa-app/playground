import CheetosRain from '@/components/CheetosRain';
import WorldcoinTicker from '@/components/WorldcoinTicker';

export default function About() {
	return (
		<div className="flex min-h-screen flex-col bg-transparent font-sans">
			<CheetosRain />
			<WorldcoinTicker />
			<div className="flex flex-1 items-center justify-center">
				<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-16 px-4 sm:px-16 bg-white/30 backdrop-blur-sm">
					<div className="flex flex-col items-center gap-6 w-full">
						<h1 className="text-4xl font-bold text-amber-900 mb-6">About</h1>

						{/* Thailand Poem */}
						<div className="p-6 bg-amber-50/70 rounded-lg border-2 border-amber-200 max-w-xl w-full">
							<h2 className="text-2xl font-bold text-amber-900 mb-4 text-center">Come to Thailand</h2>
							<div className="text-amber-800 leading-relaxed space-y-2">
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

						{/* Roman Empire */}
						<div className="p-6 bg-red-50/70 rounded-lg border-2 border-red-300 max-w-xl w-full">
							<h2 className="text-2xl font-bold text-red-900 mb-4 text-center">The Roman Empire</h2>
							<p className="text-red-800 leading-relaxed">
								The Roman Empire was one of the most remarkable civilizations in human history, spanning over a millennium and leaving an indelible mark on Western culture, law, architecture, and governance. At its peak, Rome controlled vast territories across Europe, North Africa, and the Middle East, bringing unprecedented levels of infrastructure, engineering marvels like aqueducts and roads, and a system of law that still influences modern legal codes. The Pax Romana brought relative peace and prosperity, enabling trade, cultural exchange, and technological advancement. However, the Empire ultimately fell due to a combination of factors: constant barbarian invasions, economic instability and heavy taxation, political corruption and leadership crises, overextension of military resources, and the splitting of the empire into Eastern and Western halves. By 476 CE, the Western Roman Empire collapsed, though its Eastern counterpart, the Byzantine Empire, endured for another thousand years, preserving Roman legacy until 1453.
							</p>
						</div>

						{/* Poland */}
						<div className="p-6 bg-blue-50/70 rounded-lg border-2 border-blue-300 max-w-xl w-full">
							<h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">Why Visit Poland?</h2>
							<p className="text-blue-800 leading-relaxed">
								Poland is a captivating destination that offers an extraordinary blend of rich history, stunning architecture, and vibrant culture. From the medieval streets of Kraków with its magnificent Wawel Castle to the reconstructed beauty of Warsaw's Old Town, Poland's cities tell stories of resilience and renewal. The country boasts breathtaking natural landscapes, including the Tatra Mountains, pristine Baltic beaches, and ancient Białowieża Forest. Polish cuisine is hearty and delicious, featuring pierogi, żurek, and world-class vodka. The warmth and hospitality of Polish people make visitors feel welcome, while the affordable prices allow travelers to experience luxury without breaking the bank. Whether you're exploring the poignant history of Auschwitz, marveling at the salt sculptures in Wieliczka Salt Mine, or enjoying the lively atmosphere of seaside Gdańsk, Poland offers unforgettable experiences that combine deep cultural heritage with modern European charm.
							</p>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
