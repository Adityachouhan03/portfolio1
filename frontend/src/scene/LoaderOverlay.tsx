import { Html, useProgress } from '@react-three/drei';

export default function LoaderOverlay() {
	const { progress } = useProgress();
	return (
		<Html center>
			<div className="rounded-md bg-black/60 px-3 py-2 text-xs text-white">
				Loading {progress.toFixed(0)}%
			</div>
		</Html>
	);
}



