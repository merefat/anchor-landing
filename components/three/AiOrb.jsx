'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

const TEAL = new THREE.Color('#1ebbd4');
const AMBER = new THREE.Color('#f89c11');

function Orb({ thinking = true }) {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (materialRef.current && thinking) {
      const t = state.clock.elapsedTime;
      const lerpFactor = (Math.sin(t * 0.8) + 1) / 2;
      materialRef.current.color.copy(TEAL).lerp(AMBER, lerpFactor);
    } else if (materialRef.current) {
      materialRef.current.color.copy(TEAL);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          ref={materialRef}
          color={TEAL}
          distort={thinking ? 0.5 : 0.2}
          speed={thinking ? 4 : 1}
          roughness={0.2}
          metalness={0.3}
          emissive={TEAL}
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 64]} />
        <meshBasicMaterial color={AMBER} transparent opacity={0.3} />
      </mesh>
    </Float>
  );
}

export default function AiOrb({ thinking = true, className = '' }) {
  const theme = useTheme();
  const isLight = theme === 'light';
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]} gl={{ alpha: true }}>
        <ambientLight intensity={isLight ? 0.8 : 0.4} />
        <pointLight position={[3, 3, 3]} intensity={isLight ? 0.3 : 0.6} color="#1ebbd4" />
        <pointLight position={[-3, -3, 2]} intensity={isLight ? 0.2 : 0.4} color="#f89c11" />
        <Orb thinking={thinking} />
      </Canvas>
    </div>
  );
}
