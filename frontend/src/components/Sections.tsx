import React, { useState } from 'react';

export function About() {
	return (
		<section id="about" className="mx-auto max-w-7xl px-4 py-16">
			<h2 className="text-2xl font-semibold">About me</h2>
			<p className="mt-3 text-white/80">Full‑stack engineer with a DevOps focus. I design, build, and deploy performant web apps and immersive 3D experiences.</p>
		</section>
	);
}

export function Skills() {
	const items = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Three.js'];
	return (
		<section id="skills" className="mx-auto max-w-7xl px-4 py-16">
			<h2 className="text-2xl font-semibold">Skills</h2>
			<ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
				{items.map((s) => (
					<li key={s} className="rounded-md border border-white/10 px-3 py-2 text-sm text-white/90">{s}</li>
				))}
			</ul>
		</section>
	);
}

export function Projects() {
	return (
		<section id="projects" className="mx-auto max-w-7xl px-4 py-16">
			<h2 className="text-2xl font-semibold">Projects</h2>
			<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 3 }).map((_, i) => (
					<a key={i} href={`/projects/sample-${i+1}`} className="block rounded-xl border border-white/10 p-4 hover:border-brand transition-colors">
						<h3 className="font-medium">Sample Project {i+1}</h3>
						<p className="mt-2 text-sm text-white/70">Full description and 3D/DevOps deep dive on detail page.</p>
					</a>
				))}
			</div>
		</section>
	);
}

export function DevOps() {
	return (
		<section id="devops" className="mx-auto max-w-7xl px-4 py-16">
			<h2 className="text-2xl font-semibold">DevOps / Infrastructure</h2>
			<ul className="mt-4 list-disc pl-6 text-white/80">
				<li>CI/CD with GitHub Actions</li>
				<li>Containerization via Docker, optional Kubernetes</li>
				<li>Monitoring & logs (OpenTelemetry-ready)</li>
			</ul>
		</section>
	);
}

export function Certificates() {
	return (
		<section id="certificates" className="mx-auto max-w-7xl px-4 py-16">
			<h2 className="text-2xl font-semibold">Certificates</h2>
			<div className="mt-4 grid gap-4 sm:grid-cols-2">
				<div className="aspect-[3/2] rounded-xl border border-white/10 flex items-center justify-center">AWS</div>
				<div className="aspect-[3/2] rounded-xl border border-white/10 flex items-center justify-center">Kubernetes</div>
			</div>
		</section>
	);
}

export function Contact({ onSubmit }: { onSubmit: (payload: { name: string; email: string; message: string }) => Promise<void> }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus('idle');
		
		const data = new FormData(e.currentTarget);
		const payload = {
			name: String(data.get('name') || ''),
			email: String(data.get('email') || ''),
			message: String(data.get('message') || ''),
		};
		
		try {
			await onSubmit(payload);
			setSubmitStatus('success');
			(e.currentTarget as HTMLFormElement).reset();
		} catch (error) {
			setSubmitStatus('error');
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<section id="contact" className="mx-auto max-w-2xl px-4 py-16">
			<h2 className="text-2xl font-semibold">Contact</h2>
			<p className="mt-2 text-white/70">Let's work together on your next project.</p>
			
			<form onSubmit={handleSubmit} className="mt-6 space-y-4">
				<div>
					<input 
						name="name" 
						required 
						placeholder="Your name" 
						className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 focus:border-brand focus:outline-none transition-colors" 
					/>
				</div>
				<div>
					<input 
						name="email" 
						type="email" 
						required 
						placeholder="Email address" 
						className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 focus:border-brand focus:outline-none transition-colors" 
					/>
				</div>
				<div>
					<textarea 
						name="message" 
						required 
						placeholder="Tell me about your project..." 
						className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 focus:border-brand focus:outline-none transition-colors resize-vertical" 
						rows={5} 
					/>
				</div>
				
				<button 
					type="submit"
					disabled={isSubmitting}
					className="w-full rounded-md bg-brand px-4 py-2 text-white hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					{isSubmitting ? 'Sending...' : 'Send Message'}
				</button>
				
				{submitStatus === 'success' && (
					<div className="p-3 rounded-md bg-green-500/20 border border-green-500/30 text-green-400 text-sm">
						Message sent successfully! I'll get back to you soon.
					</div>
				)}
				
				{submitStatus === 'error' && (
					<div className="p-3 rounded-md bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
						Failed to send message. Please try again or email me directly.
					</div>
				)}
			</form>
			
			<div className="mt-8 pt-8 border-t border-white/10">
				<h3 className="text-lg font-medium mb-4">Other ways to reach me</h3>
				<div className="flex flex-wrap gap-4">
					<a href="mailto:your-email@domain.com" className="text-brand hover:underline">
						your-email@domain.com
					</a>
					<a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
						LinkedIn
					</a>
					<a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
						GitHub
					</a>
				</div>
			</div>
		</section>
	);
}


