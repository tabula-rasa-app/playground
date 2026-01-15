'use client';

import { useState } from 'react';

export default function ShareButton() {
	const [copied, setCopied] = useState(false);

	const handleShare = async () => {
		const shareData = {
			title: 'Tabula Rasa - Community-Driven Creative Space',
			text: 'Check out this awesome collaborative page where anyone can change anything! Vote on ideas and watch creativity come to life.',
			url: window.location.href,
		};

		// Check if Web Share API is supported
		if (navigator.share) {
			try {
				await navigator.share(shareData);
			} catch (err) {
				// User cancelled or error occurred
				if (err.name !== 'AbortError') {
					console.error('Error sharing:', err);
				}
			}
		} else {
			// Fallback: Copy to clipboard
			try {
				await navigator.clipboard.writeText(window.location.href);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			} catch (err) {
				console.error('Error copying to clipboard:', err);
			}
		}
	};

	return (
		<button
			onClick={handleShare}
			className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
			aria-label="Share this page"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="18" cy="5" r="3"></circle>
				<circle cx="6" cy="12" r="3"></circle>
				<circle cx="18" cy="19" r="3"></circle>
				<line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
				<line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
			</svg>
			{copied ? 'Link Copied!' : 'Share with Friends'}
		</button>
	);
}
