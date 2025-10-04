import { useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

export default function FloatingGlobe() {
	const group = useRef<THREE.Group>(null);
	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		if (group.current) {
			group.current.rotation.y = t * 0.1;
			group.current.position.y = Math.sin(t * 0.8) * 0.2;
		}
	});
	return (
		<group ref={group}>
			<mesh castShadow receiveShadow>
				<sphereGeometry args={[1.4, 32, 32]} />
				<meshStandardMaterial color="#6c5ce7" metalness={0.2} roughness={0.4} />
			</mesh>
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
				<circleGeometry args={[5, 64]} />
				{/* subtle reflection plane */}
				<MeshReflectorMaterial mirror={0.1} blur={[200, 30]} mixBlur={1} opacity={0.2} transparent />
			</mesh>
		</group>
	);
}


