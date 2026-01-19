'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/recipes', label: 'Recipes' },
		{ href: '/gallery', label: 'Gallery' },
		{ href: '/about', label: 'About' },
	];

	return (
		<nav className="bg-amber-100/90 backdrop-blur-sm border-b-2 border-amber-300 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center">
						<Link href="/" className="text-2xl font-bold text-amber-900">
							Tabula Rasa
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex space-x-4">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
									pathname === link.href
										? 'bg-amber-900 text-white'
										: 'text-amber-900 hover:bg-amber-200'
								}`}
							>
								{link.label}
							</Link>
						))}
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="text-amber-900 hover:bg-amber-200 p-2 rounded-md"
							aria-label="Toggle menu"
						>
							<svg
								className="h-6 w-6"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								{isOpen ? (
									<path d="M6 18L18 6M6 6l12 12" />
								) : (
									<path d="M4 6h16M4 12h16M4 18h16" />
								)}
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isOpen && (
				<div className="md:hidden border-t border-amber-300">
					<div className="px-2 pt-2 pb-3 space-y-1">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								onClick={() => setIsOpen(false)}
								className={`block px-3 py-2 rounded-md text-base font-medium ${
									pathname === link.href
										? 'bg-amber-900 text-white'
										: 'text-amber-900 hover:bg-amber-200'
								}`}
							>
								{link.label}
							</Link>
						))}
					</div>
				</div>
			)}
		</nav>
	);
}
