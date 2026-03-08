'use client';

export default function Somonino() {
	return (
		<div className="w-full max-w-xl rounded-xl overflow-hidden border-2 border-yellow-500">
			<style>{`
				@keyframes spin-sun {
					from { transform: rotate(0deg); }
					to { transform: rotate(360deg); }
				}
				@keyframes spin-sun-reverse {
					from { transform: rotate(360deg); }
					to { transform: rotate(0deg); }
				}
				.sun-spin {
					display: inline-block;
					animation: spin-sun 3s linear infinite;
				}
				.sun-spin-reverse {
					display: inline-block;
					animation: spin-sun-reverse 2s linear infinite;
				}
				.sun-spin-slow {
					display: inline-block;
					animation: spin-sun 5s linear infinite;
				}
			`}</style>

			<div
				style={{ background: '#000', minHeight: '260px' }}
				className="flex flex-col items-center justify-center gap-6 p-8"
			>
				{/* Top row of suns */}
				<div className="flex gap-6 text-4xl">
					<span className="sun-spin">&#x2600;&#xFE0F;</span>
					<span className="sun-spin-reverse">&#x2600;&#xFE0F;</span>
					<span className="sun-spin-slow">&#x2600;&#xFE0F;</span>
				</div>

				{/* Main text */}
				<h1
					style={{
						color: '#FFD700',
						fontSize: 'clamp(2.5rem, 12vw, 5rem)',
						fontWeight: '900',
						letterSpacing: '0.05em',
						textShadow: '0 0 30px #FFD700, 0 0 60px #FFA500',
						lineHeight: 1,
					}}
				>
					Somonino
				</h1>

				{/* Bottom row of suns */}
				<div className="flex gap-6 text-4xl">
					<span className="sun-spin-slow">&#x2600;&#xFE0F;</span>
					<span className="sun-spin">&#x2600;&#xFE0F;</span>
					<span className="sun-spin-reverse">&#x2600;&#xFE0F;</span>
				</div>
			</div>
		</div>
	);
}
