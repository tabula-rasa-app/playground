'use client';
import { useState } from 'react';

export default function LotteryGenerator() {
	const [numbers, setNumbers] = useState([]);
	const [isGenerating, setIsGenerating] = useState(false);

	const generateLottery = () => {
		setIsGenerating(true);
		setNumbers([]);

		// Animate the generation
		const interval = setInterval(() => {
			setNumbers((prev) => {
				if (prev.length >= 6) {
					clearInterval(interval);
					setIsGenerating(false);
					return prev;
				}
				const newNumber = Math.floor(Math.random() * 49) + 1;
				return [...prev, newNumber];
			});
		}, 200);
	};

	const generateThaiLottery = () => {
		setIsGenerating(true);
		setNumbers([]);

		// Generate 6-digit Thai lottery number
		setTimeout(() => {
			const thaiNumber = Math.floor(Math.random() * 900000) + 100000;
			setNumbers(thaiNumber.toString().split('').map(Number));
			setIsGenerating(false);
		}, 800);
	};

	return (
		<div className="w-full max-w-md mx-auto p-6 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl shadow-lg border-2 border-amber-300">
			<h2 className="text-2xl font-bold text-amber-900 mb-4 text-center">
				🎰 สุ่มเลขหวย
			</h2>

			<div className="flex flex-wrap justify-center gap-3 mb-6 min-h-[80px] items-center">
				{numbers.map((num, index) => (
					<div
						key={index}
						className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center text-2xl font-bold text-amber-900 border-2 border-amber-400 animate-bounce"
						style={{ animationDelay: `${index * 0.1}s`, animationDuration: '0.5s' }}
					>
						{num}
					</div>
				))}
			</div>

			<div className="flex flex-col gap-3">
				<button
					onClick={generateThaiLottery}
					disabled={isGenerating}
					className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:transform-none"
				>
					{isGenerating ? 'กำลังสุ่ม...' : 'สุ่มหวยไทย 6 หลัก'}
				</button>

				<button
					onClick={generateLottery}
					disabled={isGenerating}
					className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:transform-none"
				>
					{isGenerating ? 'กำลังสุ่ม...' : 'สุ่มแบบ Lotto (1-49)'}
				</button>
			</div>

			<p className="text-sm text-amber-700 text-center mt-4">
				โชคดีมีชัย! 🍀
			</p>
		</div>
	);
}
