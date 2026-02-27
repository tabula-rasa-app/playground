export default function Home() {
	return (
		<div
			style={{
				minHeight: '100vh',
				background: 'linear-gradient(135deg, #f5a623 0%, #f7c948 50%, #e8832a 100%)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				overflow: 'hidden',
				position: 'relative',
				fontFamily: 'Comic Sans MS, Chalkboard SE, cursive',
			}}
		>
			<style>{`
				@keyframes shiba-spin {
					from { transform: rotate(0deg); }
					to { transform: rotate(360deg); }
				}
				@keyframes doge-float {
					0%, 100% { transform: translateY(0px) rotate(var(--rot, 0deg)); opacity: 0.85; }
					50% { transform: translateY(-18px) rotate(var(--rot, 0deg)); opacity: 1; }
				}
				.spinning-shiba {
					animation: shiba-spin 2.5s linear infinite;
					display: inline-block;
					line-height: 1;
					filter: drop-shadow(0 0 30px rgba(255,180,0,0.8));
				}
				.doge-word {
					position: absolute;
					font-weight: bold;
					text-shadow: 2px 2px 0px rgba(0,0,0,0.25);
					animation: doge-float 3s ease-in-out infinite;
					pointer-events: none;
				}
			`}</style>

			{/* Floating doge words */}
			<span className="doge-word" style={{ top: '8%', left: '6%', fontSize: '1.6rem', color: '#fff', '--rot': '-8deg', animationDelay: '0s' }}>wow</span>
			<span className="doge-word" style={{ top: '14%', right: '8%', fontSize: '1.3rem', color: '#7b2d00', '--rot': '6deg', animationDelay: '0.4s' }}>much spin</span>
			<span className="doge-word" style={{ top: '25%', left: '3%', fontSize: '1.1rem', color: '#fff', '--rot': '-4deg', animationDelay: '0.8s' }}>very rotate</span>
			<span className="doge-word" style={{ top: '30%', right: '4%', fontSize: '1.4rem', color: '#7b2d00', '--rot': '10deg', animationDelay: '1.2s' }}>so doge</span>
			<span className="doge-word" style={{ bottom: '28%', left: '5%', fontSize: '1.2rem', color: '#fff', '--rot': '-6deg', animationDelay: '0.6s' }}>amaze</span>
			<span className="doge-word" style={{ bottom: '22%', right: '6%', fontSize: '1.5rem', color: '#7b2d00', '--rot': '8deg', animationDelay: '1s' }}>such shiba</span>
			<span className="doge-word" style={{ bottom: '12%', left: '8%', fontSize: '1.1rem', color: '#fff', '--rot': '-3deg', animationDelay: '1.4s' }}>many wow</span>
			<span className="doge-word" style={{ bottom: '8%', right: '7%', fontSize: '1.3rem', color: '#7b2d00', '--rot': '5deg', animationDelay: '0.2s' }}>very good boi</span>

			{/* The star of the show */}
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
				<span className="spinning-shiba" style={{ fontSize: 'clamp(120px, 40vw, 220px)' }}>🐕</span>
				<p style={{
					color: '#7b2d00',
					fontSize: 'clamp(1.2rem, 5vw, 2rem)',
					fontWeight: 'bold',
					textAlign: 'center',
					textShadow: '1px 1px 0 rgba(255,255,255,0.5)',
					margin: 0,
					padding: '0 16px',
				}}>
					wow. much spin. very shiba.
				</p>
			</div>
		</div>
	);
}
