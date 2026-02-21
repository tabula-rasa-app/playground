'use client';
import { useState } from 'react';

export default function LotteryGenerator() {
	const [numbers, setNumbers] = useState([]);
	const [isGenerating, setIsGenerating] = useState(false);

	const generateLottery = () => {
		setIsGenerating(true);
		setNumbers([]);

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

		setTimeout(() => {
			const thaiNumber = Math.floor(Math.random() * 900000) + 100000;
			setNumbers(thaiNumber.toString().split('').map(Number));
			setIsGenerating(false);
		}, 800);
	};

	return (
		<div className="w-full max-w-md mx-auto p-6 bg-[var(--bg-surface)] rounded-2xl shadow-[var(--shadow-md)] border border-[var(--border-color)]">
			<h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1 text-center">
				สุ่มเลขหวย
			</h2>
			<p className="text-xs text-[var(--text-secondary)] text-center mb-5">โชคดีมีชัย! 🍀</p>

			<div className="flex flex-wrap justify-center gap-2 mb-5 min-h-[72px] items-center">
				{numbers.map((num, index) => (
					<div
						key={index}
						className="w-12 h-12 bg-[var(--bg-surface-2)] border border-[var(--border-color)] rounded-xl flex items-center justify-center text-xl font-bold text-[var(--text-primary)] animate-bounce"
						style={{ animationDelay: `${index * 0.1}s`, animationDuration: '0.5s' }}
					>
						{num}
					</div>
				))}
				{numbers.length === 0 && !isGenerating && (
					<p className="text-sm text-[var(--text-muted)]">กด generate เพื่อสุ่มเลข</p>
				)}
			</div>

			<div className="flex flex-col gap-2">
				<button
					onClick={generateThaiLottery}
					disabled={isGenerating}
					className="w-full py-2.5 px-6 bg-[var(--accent)] hover:opacity-90 disabled:opacity-40 text-white font-semibold text-sm rounded-xl shadow-[var(--shadow-sm)] transition-all duration-200 transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:transform-none"
				>
					{isGenerating ? 'กำลังสุ่ม...' : 'สุ่มหวยไทย 6 หลัก'}
				</button>

				<button
					onClick={generateLottery}
					disabled={isGenerating}
					className="w-full py-2.5 px-6 bg-[var(--bg-surface-2)] hover:bg-[var(--border-color)] disabled:opacity-40 text-[var(--text-primary)] font-semibold text-sm rounded-xl border border-[var(--border-color)] shadow-[var(--shadow-sm)] transition-all duration-200 transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:transform-none"
				>
					{isGenerating ? 'กำลังสุ่ม...' : 'สุ่มแบบ Lotto (1-49)'}
				</button>
			</div>
		</div>
	);
}
