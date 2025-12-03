import Link from "next/link";

export default function About() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-cyan-500 font-sans">
			<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-black sm:items-start">
				<div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
					<h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-white">
						About Tabula Rasa
					</h1>
					<Link
						href="/"
						className="text-lg text-cyan-400 hover:text-cyan-300 transition-colors"
					>
						← Back to Home
					</Link>
				</div>

				<div className="flex flex-col gap-6 text-center sm:text-left max-w-2xl">
					<div className="text-base text-zinc-300 leading-relaxed space-y-4">
						<p className="text-xl font-semibold text-cyan-400">
							What is Tabula Rasa?
						</p>
						<p>
							Tabula Rasa, Latin for "blank slate," is a philosophical concept
							that suggests we begin with no preconceived notions or built-in
							knowledge. This project embodies that principle—a digital canvas
							where you have complete freedom to create, modify, and shape
							anything you envision.
						</p>

						<p className="text-xl font-semibold text-cyan-400 mt-8">
							The Philosophy
						</p>
						<p>
							In a world filled with templates, constraints, and predefined
							paths, Tabula Rasa offers something different: pure potential.
							It's not about what this project is—it's about what you'll make
							it become.
						</p>

						<p className="text-xl font-semibold text-cyan-400 mt-8">
							Your Canvas
						</p>
						<p>
							This is your starting point. Built with modern web technologies,
							it provides a foundation while imposing no limits on your
							creativity. Whether you want to build a portfolio, a blog, an
							interactive experience, or something entirely unique—the choice
							is yours.
						</p>

						<p className="text-lg text-cyan-400 font-medium mt-8">
							The blank slate awaits your vision.
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}
