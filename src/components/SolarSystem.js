'use client';

import { useState, useEffect } from 'react';

export default function SolarSystem() {
	const [traveling, setTraveling] = useState(false);
	const [selectedPlanet, setSelectedPlanet] = useState(null);
	const [scale, setScale] = useState(1);

	// Adjust scale based on screen size
	useEffect(() => {
		const updateScale = () => {
			if (window.innerWidth < 640) {
				setScale(0.5); // Mobile: scale down by 50%
			} else if (window.innerWidth < 768) {
				setScale(0.7); // Tablet: scale down by 30%
			} else {
				setScale(1); // Desktop: full scale
			}
		};

		updateScale();
		window.addEventListener('resize', updateScale);
		return () => window.removeEventListener('resize', updateScale);
	}, []);

	const planets = [
		{ name: 'Mercurio', size: 8, color: '#8c7853', orbit: 60, speed: 4 },
		{ name: 'Venus', size: 12, color: '#ffc649', orbit: 85, speed: 3.5 },
		{ name: 'Tierra', size: 13, color: '#4a90e2', orbit: 110, speed: 3 },
		{ name: 'Marte', size: 10, color: '#e27b58', orbit: 135, speed: 2.5 },
		{ name: 'Júpiter', size: 25, color: '#c88b3a', orbit: 180, speed: 1.5 },
		{ name: 'Saturno', size: 22, color: '#fad5a5', orbit: 220, speed: 1.2, hasRing: true },
		{ name: 'Urano', size: 16, color: '#4fd0e7', orbit: 260, speed: 0.9 },
		{ name: 'Neptuno', size: 15, color: '#4166f5', orbit: 290, speed: 0.7 }
	];

	const handlePlanetClick = (planet) => {
		setSelectedPlanet(planet);
		setTraveling(true);
		setTimeout(() => {
			setTraveling(false);
		}, 2000);
	};

	return (
		<div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] bg-gradient-to-b from-black via-purple-950 to-indigo-950 rounded-lg overflow-hidden mb-8">
			{/* Stars background */}
			<div className="absolute inset-0">
				{[...Array(100)].map((_, i) => (
					<div
						key={i}
						className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
						style={{
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 3}s`,
							opacity: Math.random() * 0.7 + 0.3
						}}
					/>
				))}
			</div>

			{/* Traveling effect */}
			{traveling && (
				<div className="absolute inset-0 z-20 pointer-events-none">
					{[...Array(50)].map((_, i) => (
						<div
							key={i}
							className="absolute w-1 h-20 bg-white animate-warp"
							style={{
								top: `${Math.random() * 100}%`,
								left: `${Math.random() * 100}%`,
								animationDelay: `${Math.random() * 0.5}s`
							}}
						/>
					))}
				</div>
			)}

			{/* Solar system container */}
			<div
				className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
			>
				{/* Sun */}
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<div className="w-16 h-16 bg-yellow-400 rounded-full shadow-[0_0_60px_20px_rgba(255,200,0,0.8)] animate-pulse-slow" />
				</div>

				{/* Planets and orbits */}
				{planets.map((planet, index) => (
					<div key={planet.name}>
						{/* Orbit path */}
						<div
							className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-700 border-opacity-30 rounded-full"
							style={{
								width: `${planet.orbit * 2}px`,
								height: `${planet.orbit * 2}px`
							}}
						/>

						{/* Planet */}
						<div
							className="absolute top-1/2 left-1/2 animate-orbit cursor-pointer hover:scale-125 active:scale-110 transition-transform touch-manipulation"
							style={{
								width: `${planet.orbit * 2}px`,
								height: `${planet.orbit * 2}px`,
								animationDuration: `${planet.speed * 10}s`
							}}
							onClick={() => handlePlanetClick(planet)}
						>
							<div
								className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg"
								style={{
									width: `${planet.size}px`,
									height: `${planet.size}px`,
									backgroundColor: planet.color,
									boxShadow: `0 0 ${planet.size}px ${planet.size / 4}px ${planet.color}80`
								}}
							>
								{planet.hasRing && (
									<div
										className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-full"
										style={{
											width: `${planet.size * 1.8}px`,
											height: `${planet.size * 0.3}px`,
											borderColor: `${planet.color}aa`,
											borderTopColor: 'transparent',
											borderBottomColor: 'transparent'
										}}
									/>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Planet info display */}
			{selectedPlanet && (
				<div className="absolute top-4 left-4 right-4 sm:right-auto bg-black bg-opacity-70 text-white p-3 sm:p-4 rounded-lg z-30 animate-fade-in">
					<h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Viajando a {selectedPlanet.name}</h3>
					<p className="text-xs sm:text-sm">Iniciando viaje espacial...</p>
				</div>
			)}

			{/* Instructions */}
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm z-10 max-w-[90%] text-center">
				Haz clic en cualquier planeta para viajar
			</div>
		</div>
	);
}
