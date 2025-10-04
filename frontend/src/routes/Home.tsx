import { Suspense, lazy, useEffect, useState } from 'react';
import PortfolioScene from '../scene/PortfolioScene';
import { useThemeStore } from '../theme/useTheme';
import { isLowEndDevice, isWebGLSupported } from '../utils/capability';
import { About, Skills, Projects, DevOps, Certificates, Contact } from '../components/Sections';

const FloatingGlobe = lazy(() => import('../scene/FloatingGlobe'));

export default function Home() {
	const resolved = useThemeStore((s) => s.resolved);
	const [enable3D, setEnable3D] = useState(false);

	useEffect(() => {
		setEnable3D(isWebGLSupported() && !isLowEndDevice());
	}, []);
	return (
		<div className="relative">
			{/* 3D background */}
			{enable3D ? (
				<div className="pointer-events-none fixed inset-0 -z-10">
					<PortfolioScene />
				</div>
			) : (
				<div className="fixed inset-0 -z-10 bg-gradient-to-b from-brand/30 to-transparent" />
			)}

			<section className="mx-auto max-w-7xl px-4 py-24">
				<div className="glass-panel p-8">
					<p className="text-xs text-white/70">Full‑Stack Developer • DevOps • 3D/WebGL</p>
					<h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">Providing the best project experience.</h1>
					<p className="mt-4 max-w-2xl text-white/80">I build performant web apps, CI/CD pipelines, and immersive 3D interfaces.</p>
					<div className="mt-6 flex gap-3">
						<a href="#projects" className="px-4 py-2 rounded-md bg-brand text-white">Learn more</a>
						<a href="#contact" className="px-4 py-2 rounded-md border border-white/10">Contact</a>
					</div>
				</div>
			</section>

			<About />
			<Skills />
			<Projects />
			<DevOps />
			<Certificates />
			<Contact onSubmit={async (payload)=>{
				const apiUrl = (import.meta as any).env?.VITE_API_URL;
				const response = await fetch(apiUrl ? `${apiUrl}/contact` : '/api/contact', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload),
				});
				if (!response.ok) throw new Error('Failed to send message');
			}} />
		</div>
	);
}


