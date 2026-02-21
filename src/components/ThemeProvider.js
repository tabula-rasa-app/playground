'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({ isDark: false, toggleTheme: () => {} });

export function useTheme() {
	return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
	const [isDark, setIsDark] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const saved = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const shouldBeDark = saved ? saved === 'dark' : prefersDark;
		setIsDark(shouldBeDark);
		document.documentElement.classList.toggle('dark', shouldBeDark);
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		const newDark = !isDark;
		setIsDark(newDark);
		document.documentElement.classList.toggle('dark', newDark);
		localStorage.setItem('theme', newDark ? 'dark' : 'light');
	};

	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme, mounted }}>
			{children}
		</ThemeContext.Provider>
	);
}
