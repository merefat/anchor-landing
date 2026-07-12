'use client';

import { memo } from 'react';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Brain, Wallet, Zap, Users, Cpu } from 'lucide-react';

const DynamicNeonCube = dynamic(
  () => import('@/components/three/Cyber3DLibrary').then(mod => ({ default: mod.NeonCube })),
  { ssr: false, loading: () => null }
);

const DynamicNeonSphere = dynamic(
  () => import('@/components/three/Cyber3DLibrary').then(mod => ({ default: mod.NeonSphere })),
  { ssr: false, loading: () => null }
);

const DynamicNeonTorus = dynamic(
  () => import('@/components/three/Cyber3DLibrary').then(mod => ({ default: mod.NeonTorus })),
  { ssr: false, loading: () => null }
);

const DynamicNeonIcosahedron = dynamic(
  () => import('@/components/three/Cyber3DLibrary').then(mod => ({ default: mod.NeonIcosahedron })),
  { ssr: false, loading: () => null }
);

const threeDComponentMap = {
  plan: DynamicNeonCube,
  budget: DynamicNeonSphere,
  habits: DynamicNeonTorus,
  family: DynamicNeonIcosahedron,
  ai: DynamicNeonCube,
};

const features = [
  {
    id: 'plan',
    title: 'AI Planning',
    description: 'Intelligent scheduling that adapts to your patterns and priorities',
    icon: Brain,
    color: '#1ebbd4',
    size: 'large',
    position: 'span-2 row-span-2'
  },
  {
    id: 'budget',
    title: 'Smart Budgeting',
    description: 'Track expenses with real-time insights and predictive analytics',
    icon: Wallet,
    color: '#f89c11',
    size: 'medium',
    position: 'span-1 row-span-1'
  },
  {
    id: 'habits',
    title: 'Habit Tracking',
    description: 'Build lasting routines with streaks and milestones',
    icon: Zap,
    color: '#1ebbd4',
    size: 'medium',
    position: 'span-1 row-span-1'
  },
  {
    id: 'family',
    title: 'Family Sync',
    description: 'Coordinate schedules and share goals with your household',
    icon: Users,
    color: '#f89c11',
    size: 'medium',
    position: 'span-1 row-span-1'
  },
  {
    id: 'ai',
    title: 'Neural Engine',
    description: 'Machine learning that understands your unique lifestyle',
    icon: Cpu,
    color: '#1ebbd4',
    size: 'medium',
    position: 'span-1 row-span-1'
  }
];

const FeatureCard = memo(function FeatureCard({ feature, index, showThreeD }) {
  const isLarge = feature.size === 'large';
  const ThreeDComponent = threeDComponentMap[feature.id] || DynamicNeonCube;
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`glass-neon rounded-2xl p-6 relative overflow-hidden group cursor-pointer ${feature.position}`}
      style={{
        borderColor: feature.color,
        minHeight: isLarge ? '400px' : '200px'
      }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      {/* 3D Element */}
      {showThreeD && (
        <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity">
          <ThreeDComponent color={feature.color} scale={isLarge ? 1.5 : 1} />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="mb-4" style={{ color: feature.color }}>
            <Icon size={32} strokeWidth={2} />
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: feature.color }}>
            {feature.title}
          </h3>
          <p className="text-sm" style={{ color: 'var(--anchor-text)' }}>
            {feature.description}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-4"
        >
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full"
            style={{ 
              background: `${feature.color}20`,
              border: `1px solid ${feature.color}40`
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: feature.color }} />
            <span style={{ color: feature.color }}>{isLarge ? 'CORE FEATURE' : 'FEATURE'}</span>
          </div>
        </motion.div>
      </div>

      {/* Hover glow effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${feature.color}20 0%, transparent 70%)`
        }}
      />
    </motion.div>
  );
});

export default function FeaturesBento() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const showThreeD = !reducedMotion && !isMobile;

  return (
    <section 
      className="relative py-24 cyber-grid scanlines"
      style={{ background: 'var(--anchor-base)' }}
    >
      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'var(--anchor-teal-glow)' }}
      />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'var(--anchor-orange-glow)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--anchor-teal)' }}>Neural</span>
            <span style={{ color: 'var(--anchor-amber)' }}>Capabilities</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--anchor-text-muted)' }}>
            One system. Infinite possibilities. Every feature designed to amplify your productivity.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[200px]">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} showThreeD={showThreeD} />
          ))}
        </div>
      </div>
    </section>
  );
}
