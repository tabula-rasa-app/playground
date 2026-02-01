'use client';

import { useState } from 'react';

export default function ChickenCrossing() {
	const [isRunning, setIsRunning] = useState(false);
	const [crossCount, setCrossCount] = useState(0);

	const handleChickenClick = () => {
		setIsRunning(true);
		setCrossCount(prev => prev + 1);
		setTimeout(() => setIsRunning(false), 6000);
	};

	return (
		<div className="relative w-full h-[250px] sm:h-[300px] bg-gradient-to-b from-sky-300 via-green-100 to-green-200 rounded-lg overflow-hidden mb-8 shadow-xl">
			{/* Sky and sun */}
			<div className="absolute top-4 left-8 w-12 h-12 bg-yellow-400 rounded-full shadow-[0_0_30px_8px_rgba(255,220,0,0.5)]" />

			{/* Trees on the sides */}
			<div className="absolute top-12 left-4 w-8 h-16 bg-amber-900 rounded-sm">
				<div className="absolute -top-6 -left-4 w-16 h-16 bg-green-600 rounded-full" />
			</div>
			<div className="absolute top-16 right-6 w-8 h-16 bg-amber-900 rounded-sm">
				<div className="absolute -top-6 -left-4 w-16 h-16 bg-green-700 rounded-full" />
			</div>

			{/* Road */}
			<div className="absolute top-1/2 left-0 w-full h-24 sm:h-28 bg-gradient-to-b from-gray-600 via-gray-500 to-gray-600 transform -translate-y-1/2 shadow-inner">
				{/* Center line */}
				<div className="absolute top-1/2 left-0 w-full h-1 flex gap-6">
					{[...Array(15)].map((_, i) => (
						<div key={i} className="w-8 h-1 bg-yellow-400 flex-shrink-0" />
					))}
				</div>

				{/* Road edges */}
				<div className="absolute top-0 left-0 w-full h-1 bg-white opacity-70" />
				<div className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-70" />
			</div>

			{/* Grass patches */}
			<div className="absolute top-[15%] left-[20%] w-12 h-8 bg-green-400 rounded-full opacity-60" />
			<div className="absolute top-[20%] right-[25%] w-10 h-6 bg-green-500 rounded-full opacity-50" />
			<div className="absolute bottom-[15%] left-[30%] w-14 h-8 bg-green-400 rounded-full opacity-60" />
			<div className="absolute bottom-[20%] right-[20%] w-10 h-6 bg-green-500 rounded-full opacity-50" />

			{/* Chicken */}
			<div
				className={`absolute cursor-pointer hover:scale-110 active:scale-105 transition-transform touch-manipulation z-20 ${
					isRunning ? 'animate-chicken-cross' : ''
				}`}
				onClick={handleChickenClick}
				style={{
					top: '50%',
					left: isRunning ? undefined : '10%',
					transform: 'translateY(-50%)',
				}}
			>
				{/* Chicken body */}
				<div className="relative w-16 h-16 sm:w-20 sm:h-20">
					{/* Body */}
					<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 sm:w-14 h-10 sm:h-12 bg-white rounded-full border-2 border-orange-200">
						{/* Wing */}
						<div className="absolute top-2 right-0 w-4 h-6 bg-orange-100 rounded-full transform rotate-12" />
					</div>

					{/* Head */}
					<div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 sm:w-10 h-8 sm:h-10 bg-white rounded-full border-2 border-orange-200">
						{/* Beak */}
						<div className="absolute top-1/2 -right-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-orange-400" />

						{/* Eyes */}
						<div className="absolute top-2 left-1 w-2 h-2 bg-black rounded-full" />
						<div className="absolute top-2 right-1 w-2 h-2 bg-black rounded-full" />

						{/* Comb */}
						<div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-red-500 rounded-t-full" />
						<div className="absolute -top-1 left-1/2 transform -translate-x-1/2 -ml-2 w-2 h-2 bg-red-500 rounded-full" />
						<div className="absolute -top-1 left-1/2 transform -translate-x-1/2 ml-2 w-2 h-2 bg-red-500 rounded-full" />

						{/* Wattle */}
						<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-400 rounded-b-full" />
					</div>

					{/* Legs */}
					<div className={`absolute -bottom-2 left-3 w-1 h-4 bg-orange-400 ${isRunning ? 'animate-chicken-walk-left' : ''}`} />
					<div className={`absolute -bottom-2 right-3 w-1 h-4 bg-orange-400 ${isRunning ? 'animate-chicken-walk-right' : ''}`} />

					{/* Feet */}
					<div className={`absolute -bottom-2 left-2 w-3 h-1 bg-orange-500 ${isRunning ? 'animate-chicken-walk-left' : ''}`} />
					<div className={`absolute -bottom-2 right-2 w-3 h-1 bg-orange-500 ${isRunning ? 'animate-chicken-walk-right' : ''}`} />
				</div>
			</div>

			{/* Counter */}
			{crossCount > 0 && (
				<div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg z-10">
					<p className="text-xs sm:text-sm font-bold">Crossings: {crossCount}</p>
				</div>
			)}

			{/* Instructions */}
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm z-10 max-w-[90%] text-center">
				Click the chicken to cross the road!
			</div>
		</div>
	);
}
