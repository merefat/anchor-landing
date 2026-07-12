'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Neon Cube Component
export function NeonCube({ color = '#00f0ff', position = [0, 0, 0], scale = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshDistortMaterial
          color={color}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.9}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

// Neon Sphere Component
export function NeonSphere({ color = '#ffaa00', position = [0, 0, 0], scale = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.8}
          distort={0.2}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

// Neon Torus Component
export function NeonTorus({ color = '#a855f7', position = [0, 0, 0], scale = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[0.5, 0.2, 16, 64]} />
        <MeshDistortMaterial
          color={color}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.85}
          distort={0.25}
          speed={1.8}
        />
      </mesh>
    </Float>
  );
}

// Neon Icosahedron Component
export function NeonIcosahedron({ color = '#00f0ff', position = [0, 0, 0], scale = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[0.5, 0]} />
        <MeshDistortMaterial
          color={color}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.9}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

// Floating Geometric Shapes Scene
export function FloatingShapes({ count = 5, colors = ['#00f0ff', '#ffaa00', '#a855f7'] }) {
  const shapes = useMemo(() => {
    const shapeTypes = ['cube', 'sphere', 'torus', 'icosahedron'];
    return Array.from({ length: count }).map((_, i) => ({
      type: shapeTypes[i % shapeTypes.length],
      color: colors[i % colors.length],
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      ],
      scale: 0.3 + Math.random() * 0.5,
      rotationSpeed: 0.5 + Math.random() * 0.5
    }));
  }, [count, colors]);

  const ShapeComponent = ({ shape }) => {
    const meshRef = useRef();
    
    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.x += shape.rotationSpeed * 0.01;
        meshRef.current.rotation.y += shape.rotationSpeed * 0.015;
      }
    });

    const geometry = useMemo(() => {
      switch (shape.type) {
        case 'cube': return <boxGeometry args={[1, 1, 1]} />;
        case 'sphere': return <sphereGeometry args={[0.5, 32, 32]} />;
        case 'torus': return <torusGeometry args={[0.5, 0.2, 16, 100]} />;
        case 'icosahedron': return <icosahedronGeometry args={[0.5, 0]} />;
        default: return <boxGeometry args={[1, 1, 1]} />;
      }
    }, [shape.type]);

    return (
      <Float speed={shape.rotationSpeed} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh ref={meshRef} position={shape.position} scale={shape.scale}>
          {geometry}
          <MeshDistortMaterial
            color={shape.color}
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0}
            metalness={0.9}
            distort={0.3}
            speed={shape.rotationSpeed}
          />
        </mesh>
      </Float>
    );
  };

  return (
    <group>
      {shapes.map((shape, i) => (
        <ShapeComponent key={i} shape={shape} />
      ))}
    </group>
  );
}

// Cyberpunk Grid Floor
export function CyberGrid({ color = '#00f0ff' }) {
  return (
    <gridHelper
      args={[20, 20, color, color]}
      position={[0, -2, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

// Neon Ring Component
export function NeonRing({ color = '#00f0ff', position = [0, 0, 0], scale = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.05, 16, 100]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

// Particle Burst Component
export function ParticleBurst({ color = '#00f0ff', count = 50, position = [0, 0, 0] }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        position[0] + (Math.random() - 0.5) * 2,
        position[1] + (Math.random() - 0.5) * 2,
        position[2] + (Math.random() - 0.5) * 2
      ],
      velocity: [
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ],
      size: 0.02 + Math.random() * 0.03
    }));
  }, [count, position]);

  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array;
      particles.forEach((particle, i) => {
        positions[i * 3] += particle.velocity[0];
        positions[i * 3 + 1] += particle.velocity[1];
        positions[i * 3 + 2] += particle.velocity[2];
      });
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={new Float32Array(particles.flatMap(p => p.position))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.05} transparent opacity={0.8} />
    </points>
  );
}

// 3D Scene Wrapper
export function CyberScene({ children, cameraPosition = [0, 0, 5] }) {
  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ffaa00" />
      <OrbitControls enableZoom={false} enablePan={false} />
      {children}
    </Canvas>
  );
}
