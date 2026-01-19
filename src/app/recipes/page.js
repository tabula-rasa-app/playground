import CheetosRain from '@/components/CheetosRain';
import WorldcoinTicker from '@/components/WorldcoinTicker';

export default function Recipes() {
	return (
		<div className="flex min-h-screen flex-col bg-transparent font-sans">
			<CheetosRain />
			<WorldcoinTicker />
			<div className="flex flex-1 items-center justify-center">
				<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-16 px-4 sm:px-16 bg-white/30 backdrop-blur-sm">
					<div className="flex flex-col items-center gap-6 w-full">
						<h1 className="text-4xl font-bold text-amber-900 mb-6">Recipes</h1>

						{/* Best Recipe */}
						<div className="p-6 bg-green-50/80 rounded-lg border-2 border-green-400 max-w-xl w-full shadow-lg">
							<h2 className="text-3xl font-bold text-green-900 mb-4 text-center">🍝 The Best Spaghetti Carbonara</h2>
							<div className="text-green-900 leading-relaxed space-y-4">
								<div>
									<h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
									<ul className="list-disc list-inside space-y-1 text-green-800">
										<li>400g spaghetti</li>
										<li>200g guanciale or pancetta, diced</li>
										<li>4 large egg yolks</li>
										<li>1 whole egg</li>
										<li>100g Pecorino Romano cheese, finely grated</li>
										<li>Black pepper, freshly ground</li>
										<li>Salt for pasta water</li>
									</ul>
								</div>
								<div>
									<h3 className="text-xl font-semibold mb-2">Instructions:</h3>
									<ol className="list-decimal list-inside space-y-2 text-green-800">
										<li>Bring a large pot of salted water to boil and cook spaghetti until al dente.</li>
										<li>While pasta cooks, fry guanciale in a large pan until crispy and golden.</li>
										<li>In a bowl, whisk together egg yolks, whole egg, and Pecorino cheese.</li>
										<li>Reserve 1 cup of pasta water, then drain the spaghetti.</li>
										<li>Remove pan from heat, add hot pasta to the guanciale.</li>
										<li>Quickly mix in the egg mixture, adding pasta water to create a creamy sauce.</li>
										<li>Season generously with black pepper and serve immediately!</li>
									</ol>
								</div>
								<p className="text-center italic text-green-700 font-medium pt-2">
									⭐ Chef's Tip: The key is to mix off the heat so the eggs don't scramble!
								</p>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
