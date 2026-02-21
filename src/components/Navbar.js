'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const { isDark, toggleTheme, mounted } = useTheme();

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/recipes', label: 'Recipes' },
		{ href: '/gallery', label: 'Gallery' },
		{ href: '/about', label: 'About' },
	];

	return (
		<nav className="bg-[var(--bg-surface)]/90 backdrop-blur-md border-b border-[var(--border-color)] sticky top-0 z-50 shadow-[var(--shadow-sm)]">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-14">
					<div className="flex items-center">
						<Link href="/" className="text-xl font-semibold text-[var(--text-primary)] tracking-tight">
							Tabula Rasa
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-1">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
									pathname === link.href
										? 'bg-[var(--accent-soft)] text-[var(--accent)]'
										: 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]'
								}`}
							>
								{link.label}
							</Link>
						))}

						{/* Dark mode toggle */}
						{mounted && (
							<button
								onClick={toggleTheme}
								aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
								className="ml-2 p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors"
							>
								{isDark ? (
									<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
										<path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
									</svg>
								) : (
									<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
										<path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
									</svg>
								)}
							</button>
						)}
					</div>

					{/* Mobile: theme toggle + hamburger */}
					<div className="md:hidden flex items-center gap-1">
						{mounted && (
							<button
								onClick={toggleTheme}
								aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
								className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] transition-colors"
							>
								{isDark ? (
									<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
										<path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
									</svg>
								) : (
									<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
										<path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
									</svg>
								)}
							</button>
						)}
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] p-2 rounded-lg"
							aria-label="Toggle menu"
						>
							<svg
								className="h-5 w-5"
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
				<div className="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-surface)]">
					<div className="px-3 py-2 space-y-1">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								onClick={() => setIsOpen(false)}
								className={`block px-3 py-2 rounded-lg text-sm font-medium ${
									pathname === link.href
										? 'bg-[var(--accent-soft)] text-[var(--accent)]'
										: 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]'
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
