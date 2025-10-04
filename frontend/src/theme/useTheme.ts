import { create } from 'zustand';
import { useEffect } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

type ThemeState = {
	mode: ThemeMode;
	resolved: 'light' | 'dark';
	setMode: (mode: ThemeMode) => void;
};

function resolveMode(mode: ThemeMode): 'light' | 'dark' {
	if (mode === 'system') {
		return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
	}
	return mode;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
	mode: (localStorage.getItem('themeMode') as ThemeMode) || 'system',
	resolved: 'dark',
	setMode: (mode) => {
		localStorage.setItem('themeMode', mode);
		const resolved = resolveMode(mode);
		set({ mode, resolved });
		document.documentElement.setAttribute('data-theme', resolved);
	},
}));

export function useInitTheme() {
	const { mode, setMode } = useThemeStore();
	useEffect(() => {
		setMode(mode);
		const mq = window.matchMedia('(prefers-color-scheme: light)');
		const handler = () => {
			if (useThemeStore.getState().mode === 'system') setMode('system');
		};
		mq.addEventListener('change', handler);
		return () => mq.removeEventListener('change', handler);
	}, [mode, setMode]);
}


