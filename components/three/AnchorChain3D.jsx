'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

const TEAL = new THREE.Color('#1ebbd4');
const AMBER = new THREE.Color('#f89c11');

function ChainLink({ position, rotation, index, linkSize }) {
  const materialRef = useRef();

  useFrame((state) => {
    if (materialRef.current) {
      const t = state.clock.elapsedTime;
      const lerpFactor = (Math.sin(t * 0.5 + index * 0.8) + 1) / 2;
      materialRef.current.color.copy(TEAL).lerp(AMBER, lerpFactor);
      materialRef.current.emissive.copy(TEAL).lerp(AMBER, lerpFactor);
    }
  });

  return (
    <mesh position={position} rotation={rotation}>
      <torusGeometry args={[linkSize, linkSize * 0.22, 16, 48]} />
      <meshStandardMaterial
        ref={materialRef}
        color={TEAL}
        metalness={0.85}
        roughness={0.2}
        emissive={TEAL}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

function ChainGroup({ linkCount, linkSize, rotationSpeed }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
    }
  });

  const links = [];
  const spacing = linkSize * 1.6;
  for (let i = 0; i < linkCount; i++) {
    const offset = (i - (linkCount - 1) / 2) * spacing;
    links.push(
      <ChainLink
        key={i}
        position={[offset, 0, 0]}
        rotation={[0, 0, i % 2 === 0 ? 0 : Math.PI / 2]}
        index={i}
        linkSize={linkSize}
      />
    );
  }

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef}>{links}</group>
    </Float>
  );
}

export default function AnchorChain3D({
  linkCount = 5,
  linkSize = 0.6,
  rotationSpeed = 0.3,
  className = '',
}) {
  const theme = useTheme();
  const isLight = theme === 'light';

  return (
    <div className={className} style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={isLight ? 0.7 : 0.35} />
        <pointLight position={[4, 3, 3]} intensity={isLight ? 0.4 : 0.7} color="#1ebbd4" />
        <pointLight position={[-4, -3, 2]} intensity={isLight ? 0.3 : 0.5} color="#f89c11" />
        <directionalLight position={[0, 5, 5]} intensity={isLight ? 0.3 : 0.2} />
        <ChainGroup
          linkCount={linkCount}
          linkSize={linkSize}
          rotationSpeed={rotationSpeed}
        />
      </Canvas>
    </div>
  );
}
