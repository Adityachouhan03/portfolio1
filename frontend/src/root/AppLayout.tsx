import { Outlet, NavLink } from 'react-router-dom';
import ThemeToggle from '../theme/ThemeToggle';
import { useInitTheme } from '../theme/useTheme';

export default function AppLayout() {
	useInitTheme();
	return (
		<div className="min-h-screen">
			<header className="fixed inset-x-0 top-0 z-50">
				<nav className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
					<div className="font-semibold">My Portfolio</div>
					<ul className="flex gap-4 text-sm">
						<li><NavLink to="/" className={({isActive})=>isActive? 'text-brand': ''}>Home</NavLink></li>
						<li><a href="#skills">Skills</a></li>
						<li><a href="#projects">Projects</a></li>
						<li><a href="#devops">DevOps</a></li>
						<li><NavLink to="/blog">Blog</NavLink></li>
					</ul>
					<ThemeToggle />
				</nav>
			</header>
			<main className="pt-16">
				<Outlet />
			</main>
		</div>
	);
}


