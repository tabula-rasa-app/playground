import Link from "next/link";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-cyan-500 font-sans">
			<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-black sm:items-start">
				<div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
					<h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-white">
						Tabula rasa
					</h1>
					<p className="text-lg text-zinc-400">Change anything you want</p>
					<Link
						href="/about"
						className="text-base text-cyan-400 hover:text-cyan-300 transition-colors underline"
					>
						Learn more about this project →
					</Link>
				</div>

				<div className="flex flex-col gap-4 text-center sm:text-left max-w-2xl">
					<h2 className="text-2xl font-semibold text-cyan-400">The Blank Canvas</h2>
					<div className="text-base text-zinc-300 leading-relaxed space-y-4">
						<p>
							Once upon a time, in a digital realm where possibilities were endless,
							there existed a magical space called Tabula Rasa—a blank slate waiting
							to be filled with dreams and ideas.
						</p>
						<p>
							Every visitor who arrived at this place carried with them the power of
							creation. Some painted it with vibrant colors, others filled it with
							stories and songs. Each transformation was unique, reflecting the soul
							of its creator.
						</p>
						<p>
							The beauty of this place was not in what it was, but in what it could
							become. Today it might be a simple page with cyan and black. Tomorrow?
							Perhaps a gallery, a journal, or a portal to adventures unknown.
						</p>
						<p className="text-cyan-400 font-medium">
							What will you create on your blank slate?
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}
