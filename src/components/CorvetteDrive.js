'use client';

import { useState, useEffect } from 'react';

export default function CorvetteDrive() {
	const [speed, setSpeed] = useState(1);
	const [showSpeedometer, setShowSpeedometer] = useState(false);

	const handleCarClick = () => {
		setSpeed(prevSpeed => prevSpeed === 1 ? 2 : 1);
		setShowSpeedometer(true);
		setTimeout(() => setShowSpeedometer(false), 2000);
	};

	return (
		<div className="relative w-full h-[300px] sm:h-[400px] bg-gradient-to-b from-sky-400 via-sky-300 to-green-200 rounded-lg overflow-hidden mb-8 shadow-xl">
			{/* Sun */}
			<div className="absolute top-6 right-8 w-16 h-16 bg-yellow-300 rounded-full shadow-[0_0_40px_10px_rgba(255,220,0,0.6)]" />

			{/* Clouds */}
			<div className="absolute top-12 left-10 w-24 h-8 bg-white rounded-full opacity-80 animate-float-slow" />
			<div className="absolute top-20 right-32 w-32 h-10 bg-white rounded-full opacity-70 animate-float-slower" />
			<div className="absolute top-32 left-1/3 w-28 h-8 bg-white rounded-full opacity-75 animate-float-slow" />

			{/* Road */}
			<div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-700 via-gray-600 to-gray-700">
				{/* Road markings */}
				<div className="absolute top-1/2 left-0 w-full h-1 flex gap-8 animate-road-marks">
					{[...Array(20)].map((_, i) => (
						<div key={i} className="w-12 h-1 bg-yellow-300 flex-shrink-0" />
					))}
				</div>
				<div className="absolute top-1/2 left-0 w-full h-1 flex gap-8 animate-road-marks-delayed">
					{[...Array(20)].map((_, i) => (
						<div key={i} className="w-12 h-1 bg-yellow-300 flex-shrink-0" />
					))}
				</div>

				{/* Road edge */}
				<div className="absolute bottom-0 w-full h-2 bg-white opacity-80" />
			</div>

			{/* Corvette */}
			<div
				className="absolute bottom-20 cursor-pointer hover:scale-110 active:scale-105 transition-transform touch-manipulation animate-corvette-drive z-10"
				onClick={handleCarClick}
				style={{
					animationDuration: speed === 1 ? '8s' : '4s'
				}}
			>
				{/* Car body */}
				<div className="relative w-24 h-12 sm:w-32 sm:h-16">
					{/* Main body */}
					<div className="absolute bottom-0 w-full h-8 sm:h-10 bg-red-600 rounded-lg shadow-2xl">
						{/* Hood stripe */}
						<div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-full bg-white opacity-80" />
					</div>

					{/* Windshield */}
					<div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-6 w-10 sm:w-12 h-5 sm:h-6 bg-sky-900 rounded-t-lg transform skew-x-12 opacity-80" />

					{/* Front lights */}
					<div className="absolute bottom-1 -right-1 w-2 h-2 bg-yellow-200 rounded-full shadow-[0_0_8px_2px_rgba(255,255,100,0.8)]" />

					{/* Rear lights */}
					<div className="absolute bottom-1 -left-1 w-2 h-2 bg-red-400 rounded-full" />

					{/* Wheels */}
					<div className="absolute -bottom-1 left-1 sm:left-2 w-5 h-5 sm:w-6 sm:h-6 bg-gray-900 rounded-full border-2 border-gray-400">
						<div className="absolute inset-1 bg-gray-600 rounded-full animate-spin-wheels" style={{animationDuration: speed === 1 ? '0.5s' : '0.25s'}} />
					</div>
					<div className="absolute -bottom-1 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gray-900 rounded-full border-2 border-gray-400">
						<div className="absolute inset-1 bg-gray-600 rounded-full animate-spin-wheels" style={{animationDuration: speed === 1 ? '0.5s' : '0.25s'}} />
					</div>

					{/* Speed lines when fast */}
					{speed === 2 && (
						<>
							<div className="absolute top-2 -left-8 w-6 h-0.5 bg-white opacity-60 animate-speed-lines" />
							<div className="absolute top-4 -left-6 w-4 h-0.5 bg-white opacity-50 animate-speed-lines" style={{animationDelay: '0.1s'}} />
							<div className="absolute top-6 -left-7 w-5 h-0.5 bg-white opacity-40 animate-speed-lines" style={{animationDelay: '0.2s'}} />
						</>
					)}
				</div>
			</div>

			{/* Speedometer */}
			{showSpeedometer && (
				<div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-4 py-3 rounded-lg z-20 animate-fade-in">
					<p className="text-sm font-bold">{speed === 1 ? 'Cruising' : 'TURBO MODE!'}</p>
					<p className="text-xs">{speed === 1 ? '60 MPH' : '120 MPH'}</p>
				</div>
			)}

			{/* Instructions */}
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm z-10 max-w-[90%] text-center">
				Click the Corvette to toggle speed
			</div>
		</div>
	);
}
