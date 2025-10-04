import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProjectSceneProps {
  projectType?: string;
  light: boolean;
}

export default function ProjectScene({ projectType, light }: ProjectSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const getProjectModel = () => {
    switch (projectType) {
      case 'sample-1':
        return <ECommerceModel light={light} />;
      case 'sample-2':
        return <DashboardModel light={light} />;
      case 'sample-3':
        return <MicroservicesModel light={light} />;
      default:
        return <DefaultModel light={light} />;
    }
  };

  return (
    <group ref={groupRef}>
      {getProjectModel()}
    </group>
  );
}

function ECommerceModel({ light }: { light: boolean }) {
  return (
    <group>
      {/* Shopping cart representation */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.6, 1.2]} />
        <meshStandardMaterial 
          color={light ? '#10b981' : '#059669'} 
          metalness={0.3} 
          roughness={0.7}
        />
      </mesh>
      
      {/* Products floating around */}
      <mesh position={[1.5, 0.5, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color={light ? '#f59e0b' : '#d97706'} />
      </mesh>
      
      <mesh position={[-1.5, -0.3, 0.5]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color={light ? '#ef4444' : '#dc2626'} />
      </mesh>
      
      {/* Payment flow indicator */}
      <mesh position={[0, 1, 0]}>
        <torusGeometry args={[0.3, 0.05, 8, 16]} />
        <meshStandardMaterial 
          color={light ? '#8b5cf6' : '#7c3aed'} 
          emissive={light ? '#a78bfa' : '#6d28d9'}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

function DashboardModel({ light }: { light: boolean }) {
  return (
    <group>
      {/* Main dashboard */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 1, 0.1]} />
        <meshStandardMaterial 
          color={light ? '#1e40af' : '#1e3a8a'} 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Data visualization elements */}
      <mesh position={[-0.5, 0, 0.1]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 8]} />
        <meshStandardMaterial color={light ? '#06b6d4' : '#0891b2'} />
      </mesh>
      
      <mesh position={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
        <meshStandardMaterial color={light ? '#84cc16' : '#65a30d'} />
      </mesh>
      
      <mesh position={[0.5, 0, 0.1]}>
        <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
        <meshStandardMaterial color={light ? '#f97316' : '#ea580c'} />
      </mesh>
      
      {/* 3D data points */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial 
          color={light ? '#ec4899' : '#db2777'} 
          emissive={light ? '#f472b6' : '#e879f9'}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function MicroservicesModel({ light }: { light: boolean }) {
  return (
    <group>
      {/* Service nodes */}
      <mesh position={[-1, 0, 0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshStandardMaterial 
          color={light ? '#3b82f6' : '#2563eb'} 
          metalness={0.6} 
          roughness={0.4}
        />
      </mesh>
      
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 12, 12]} />
        <meshStandardMaterial 
          color={light ? '#8b5cf6' : '#7c3aed'} 
          metalness={0.6} 
          roughness={0.4}
        />
      </mesh>
      
      <mesh position={[1, 0, 0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshStandardMaterial 
          color={light ? '#06b6d4' : '#0891b2'} 
          metalness={0.6} 
          roughness={0.4}
        />
      </mesh>
      
      {/* API Gateway */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.5, 0.2, 0.8]} />
        <meshStandardMaterial 
          color={light ? '#f59e0b' : '#d97706'} 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Database */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.6, 12]} />
        <meshStandardMaterial 
          color={light ? '#10b981' : '#059669'} 
          metalness={0.4} 
          roughness={0.6}
        />
      </mesh>
      
      {/* Connection lines */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshBasicMaterial 
          color={light ? '#94a3b8' : '#64748b'} 
          transparent 
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

function DefaultModel({ light }: { light: boolean }) {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial 
          color={light ? '#6366f1' : '#4f46e5'} 
          metalness={0.7} 
          roughness={0.3}
          wireframe={true}
        />
      </mesh>
      
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial 
          color={light ? '#a78bfa' : '#8b5cf6'} 
          metalness={0.5} 
          roughness={0.5}
        />
      </mesh>
    </group>
  );
}
