import { useThemeStore } from './useTheme';

export default function ThemeToggle() {
	const mode = useThemeStore((s) => s.mode);
	const resolved = useThemeStore((s) => s.resolved);
	const setMode = useThemeStore((s) => s.setMode);

	return (
		<button
			aria-label="Toggle theme"
			onClick={() => setMode(resolved === 'light' ? 'dark' : 'light')}
			className="rounded-full border border-white/10 px-3 py-1 text-xs hover:bg-white/5"
		>
			{resolved === 'light' ? 'Day' : 'Night'}
		</button>
	);
}


