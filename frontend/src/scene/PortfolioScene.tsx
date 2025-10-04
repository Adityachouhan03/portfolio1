import { Suspense, useMemo, useRef } from 'react';
import { Environment, Float, Html, OrbitControls, PresentationControls } from '@react-three/drei';
import { Canvas, useFrame as useThreeFrame } from '@react-three/fiber';
import * as THREE from 'three';
import LoaderOverlay from './LoaderOverlay';
import { useThemeStore } from '../theme/useTheme';

function makeCanvasTexture(label: string, light: boolean) {
	const canvas = document.createElement('canvas');
	canvas.width = 256; canvas.height = 256;
	const ctx = canvas.getContext('2d')!;
	const grad = ctx.createRadialGradient(128,128,20,128,128,128);
	if (light) { grad.addColorStop(0,'#ffffff'); grad.addColorStop(1,'#a78bfa'); }
	else { grad.addColorStop(0,'#a78bfa'); grad.addColorStop(1,'#1f1b2e'); }
	ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(128,128,120,0,Math.PI*2); ctx.fill();
	ctx.fillStyle = light ? '#1e1b4b' : '#e5e7eb';
	ctx.font = 'bold 88px Inter, system-ui, sans-serif';
	ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
	ctx.fillText(label, 128, 132);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const texture = new (window as any).THREE.CanvasTexture(canvas);
	texture.anisotropy = 4; texture.needsUpdate = true;
	return texture;
}

function FloatingParticles({ count = 50 }: { count?: number }) {
	const meshRef = useRef<THREE.InstancedMesh>(null);
	const particles = useMemo(() => {
		const positions = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 20;
			positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
			positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
		}
		return positions;
	}, [count]);

	useThreeFrame((state) => {
		if (meshRef.current) {
			meshRef.current.rotation.y += 0.001;
			meshRef.current.rotation.x += 0.0005;
		}
	});

	return (
		<instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
			<sphereGeometry args={[0.02, 8, 8]} />
			<meshBasicMaterial color="#7c4dff" transparent opacity={0.6} />
			<instancedBufferAttribute attach="instancePosition" args={[particles, 3]} />
		</instancedMesh>
	);
}

function TechSprites({ light }: { light: boolean }) {
	const items = useMemo(() => ['R','TS','JS','D','AWS'], []);
	const positions = useMemo(
		() => ([[-2.5,1.2,-1],[2.2,0.8,-1.2],[0.2,1.6,-1.4],[-1.2,-0.4,-1],[1.4,-0.6,-1.2]]),
		[]
	);
	
	return (
		<group>
			{items.map((label, i) => (
				<Float key={i} speed={1 + i * 0.5} rotationIntensity={0.5} floatIntensity={0.3}>
					<sprite position={positions[i] as any} scale={[0.7,0.7,0.7]}>
						<spriteMaterial map={makeCanvasTexture(label, light)} transparent depthWrite={false} />
					</sprite>
				</Float>
			))}
		</group>
	);
}

function Spaceship({ light }: { light: boolean }) {
	const groupRef = useRef<THREE.Group>(null);
	
	useThreeFrame((state) => {
		if (groupRef.current) {
			groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
			groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
		}
	});

	return (
		<group ref={groupRef}>
			{/* Main body */}
			<mesh position={[0, 0, 0]} castShadow>
				<boxGeometry args={[0.8, 0.3, 1.2]} />
				<meshStandardMaterial 
					color={light ? '#6366f1' : '#4f46e5'} 
					metalness={0.8} 
					roughness={0.2}
					emissive={light ? '#e0e7ff' : '#312e81'}
					emissiveIntensity={0.1}
				/>
			</mesh>
			
			{/* Cockpit */}
			<mesh position={[0, 0.2, 0.3]} castShadow>
				<sphereGeometry args={[0.15, 8, 8]} />
				<meshStandardMaterial 
					color={light ? '#f8fafc' : '#1e293b'} 
					transparent 
					opacity={0.7}
					metalness={0.9}
					roughness={0.1}
				/>
			</mesh>
			
			{/* Wings */}
			<mesh position={[-0.6, 0, 0]} castShadow>
				<boxGeometry args={[0.2, 0.1, 0.8]} />
				<meshStandardMaterial 
					color={light ? '#8b5cf6' : '#7c3aed'} 
					metalness={0.6} 
					roughness={0.3}
				/>
			</mesh>
			<mesh position={[0.6, 0, 0]} castShadow>
				<boxGeometry args={[0.2, 0.1, 0.8]} />
				<meshStandardMaterial 
					color={light ? '#8b5cf6' : '#7c3aed'} 
					metalness={0.6} 
					roughness={0.3}
				/>
			</mesh>
			
			{/* Engine glow */}
			<mesh position={[0, 0, -0.8]}>
				<sphereGeometry args={[0.2, 8, 8]} />
				<meshBasicMaterial 
					color={light ? '#fbbf24' : '#f59e0b'} 
					transparent 
					opacity={0.8}
				/>
			</mesh>
		</group>
	);
}

function LowPolyOrb({ light }: { light: boolean }) {
	return (
		<group>
			<mesh castShadow receiveShadow>
				<sphereGeometry args={[0.9, 16, 16]} />
				<meshStandardMaterial color={light? '#7c4dff':'#6c5ce7'} roughness={0.4} metalness={0.2} />
			</mesh>
			<mesh rotation={[Math.PI/2,0,0]}>
				<torusGeometry args={[1.3, 0.05, 8, 64]} />
				<meshStandardMaterial color={light? '#c4b5fd':'#8b5cf6'} emissive={light? '#cabfff':'#7c4dff'} emissiveIntensity={0.2} />
			</mesh>
		</group>
	);
}

export default function PortfolioScene() {
	const resolved = useThemeStore((s) => s.resolved);
	return (
		<Canvas camera={{ position: [0, 0.6, 4.2], fov: 50 }} dpr={[1, 2]}>
			<color attach="background" args={[resolved === 'light' ? '#eef2ff' : '#0b0b12']} />
			<Suspense fallback={<LoaderOverlay />}>
				<Environment preset={resolved === 'light' ? 'sunset' : 'city'} background={false} />
				<ambientLight intensity={resolved === 'light' ? 0.9 : 0.5} />
				<directionalLight position={[3, 5, 1]} intensity={resolved === 'light' ? 1.2 : 0.9} color={resolved === 'light' ? '#ffffff' : '#9ab6ff'} />

				<PresentationControls enabled global snap={false} speed={1} zoom={0.8} polar={[0, Math.PI / 6]}>
					<Float floatIntensity={1.2} rotationIntensity={0.2}>
						<group position={[0, -0.4, 0]}>
							<LowPolyOrb light={resolved==='light'} />
						</group>
					</Float>
					
					{/* Secondary spaceship model */}
					<Float floatIntensity={0.8} rotationIntensity={0.3} speed={2}>
						<group position={[2.5, 1.5, -1]}>
							<Spaceship light={resolved==='light'} />
						</group>
					</Float>
				</PresentationControls>
				
				<FloatingParticles count={30} />
				<TechSprites light={resolved==='light'} />
				<Html position={[0, -1.2, 0]} center>
					<div className="text-[10px] text-white/70">Drag to rotate • Multiple 3D models</div>
				</Html>
			</Suspense>
			<OrbitControls enablePan={false} enableZoom={false} />
		</Canvas>
	);
}



