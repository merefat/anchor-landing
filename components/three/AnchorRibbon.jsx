'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const TEAL = '#1ebbd4';
const AMBER = '#f89c11';

function createAnchorCurve(offset = 0, twist = 0.3) {
  const points = [];
  const segments = 80;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const angle = t * Math.PI * 4 + offset;

    // Anchor shank (vertical stem)
    const y = 2.5 - t * 5;

    // Arms curve outward at the bottom (anchor flukes)
    const armSpread = t < 0.3 ? 0 : Math.pow((t - 0.3) / 0.7, 1.5) * 1.8;

    // Twist intertwines the two ribbons
    const twistX = Math.cos(angle) * twist * t;
    const twistZ = Math.sin(angle) * twist * t;

    // Base x position with arm spread
    const baseX = Math.sin(t * Math.PI) * 0.3;
    const armX = armSpread * Math.cos(t * Math.PI * 0.5);

    // Combine: the curve goes down, spreads into arms, twists
    const x = baseX + armX + twistX;
    const z = twistZ + armSpread * 0.3 * Math.sin(t * Math.PI);

    points.push(new THREE.Vector3(x, y, z));
  }

  return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
}

function RibbonTube({ color, offset, twistAmount, roughness = 0.35 }) {
  const meshRef = useRef();

  const curve = useMemo(() => createAnchorCurve(offset, twistAmount), [offset, twistAmount]);

  const geometry = useMemo(() => {
    const geo = new THREE.TubeGeometry(curve, 80, 0.08, 8, false);
    return geo;
  }, [curve]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhysicalMaterial
        color={color}
        roughness={roughness}
        metalness={0.2}
        clearcoat={0.4}
        clearcoatRoughness={0.3}
        sheen={0.5}
        sheenColor={color}
        sheenRoughness={0.4}
        envMapIntensity={0.8}
      />
    </mesh>
  );
}

function AnchorGroup({ pointer, roughnessOverride }) {
  const groupRef = useRef();
  const { viewport } = useThree();

  useFrame(() => {
    if (groupRef.current && pointer.current) {
      const targetX = pointer.current.x * 0.3;
      const targetY = pointer.current.y * 0.2;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef}>
        {/* Teal ribbon */}
        <RibbonTube color={TEAL} offset={0} twistAmount={0.35} roughness={roughnessOverride ?? 0.35} />
        {/* Amber ribbon — offset by half rotation to intertwine */}
        <RibbonTube color={AMBER} offset={Math.PI} twistAmount={0.35} roughness={roughnessOverride ?? 0.35} />

        {/* Ring at top (anchor ring) */}
        <mesh position={[0, 2.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3, 0.06, 16, 48]} />
          <meshPhysicalMaterial
            color={TEAL}
            roughness={roughnessOverride ?? 0.35}
            metalness={0.3}
            clearcoat={0.5}
            sheen={0.5}
            sheenColor={TEAL}
          />
        </mesh>

        {/* Crossbar (anchor stock) */}
        <mesh position={[0, 1.8, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.05, 1.2, 8, 16]} />
          <meshPhysicalMaterial
            color={AMBER}
            roughness={roughnessOverride ?? 0.35}
            metalness={0.2}
            clearcoat={0.4}
            sheen={0.5}
            sheenColor={AMBER}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function AnchorRibbon({ className = '' }) {
  const pointerRef = useRef({ x: 0, y: 0 });
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.getAttribute('data-theme') === 'light');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={className}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointerRef.current = {
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
        };
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={isLight ? 0.8 : 0.3} />
        <directionalLight position={[5, 5, 5]} intensity={isLight ? 1.0 : 0.6} />
        <pointLight position={[-5, 3, 2]} intensity={isLight ? 0.2 : 0.4} color={TEAL} />
        <pointLight position={[5, -3, 2]} intensity={isLight ? 0.2 : 0.4} color={AMBER} />
        <spotLight position={[0, 5, 5]} intensity={isLight ? 0.3 : 0.5} angle={0.3} penumbra={0.5} />

        <AnchorGroup pointer={pointerRef} roughnessOverride={isLight ? 0.6 : undefined} />

        <Environment preset={isLight ? 'studio' : 'night'} />
      </Canvas>
    </div>
  );
}
