'use client';

import dynamic from 'next/dynamic';

export const DynamicAnchorRibbon = dynamic(
  () => import('@/components/three/AnchorRibbon'),
  { ssr: false, loading: () => null }
);

export const DynamicAiOrb = dynamic(
  () => import('@/components/three/AiOrb'),
  { ssr: false, loading: () => null }
);

export const DynamicParticleField = dynamic(
  () => import('@/components/three/ParticleField'),
  { ssr: false, loading: () => null }
);

export const DynamicAnchorChain3D = dynamic(
  () => import('@/components/three/AnchorChain3D'),
  { ssr: false, loading: () => null }
);
