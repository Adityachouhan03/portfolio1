export function isWebGLSupported(): boolean {
	try {
		const canvas = document.createElement('canvas');
		return !!(
			(canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) &&
			window.WebGLRenderingContext
		);
	} catch {
		return false;
	}
}

export function isLowEndDevice(): boolean {
	const memory = (navigator as any).deviceMemory || 4;
	const cores = (navigator as any).hardwareConcurrency || 4;
	const lowMem = memory <= 2;
	const lowCores = cores <= 2;
	const smallScreen = Math.min(window.innerWidth, window.innerHeight) < 400;
	return lowMem || lowCores || smallScreen;
}


