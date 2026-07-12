'use client';

import { useEffect, useRef } from 'react';

let mouseX = 0;
let mouseY = 0;
let rafId = null;
const listeners = new Set();

function updateMousePosition(e) {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
}

function tick() {
  listeners.forEach((listener) => listener(mouseX, mouseY));
  rafId = requestAnimationFrame(tick);
}

export function useParallax(intensity = 1) {
  const ref = useRef(null);
  const callbackRef = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Add global mouse listener if this is the first subscriber
    if (listeners.size === 0) {
      window.addEventListener('mousemove', updateMousePosition);
      rafId = requestAnimationFrame(tick);
    }

    // Create callback for this element
    const callback = (mx, my) => {
      if (!ref.current) return;
      const x = mx * intensity * 20; // Max 20px movement
      const y = my * intensity * 20;
      ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    callbackRef.current = callback;
    listeners.add(callback);

    return () => {
      listeners.delete(callback);
      if (listeners.size === 0) {
        window.removeEventListener('mousemove', updateMousePosition);
        if (rafId) cancelAnimationFrame(rafId);
      }
    };
  }, [intensity]);

  return ref;
}

export function useTilt(intensity = 1) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * intensity * 5; // Max 5deg
      const rotateY = ((centerX - x) / centerX) * intensity * 5;
      ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      ref.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };

    ref.current.addEventListener('mousemove', handleMouseMove);
    ref.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ref.current?.removeEventListener('mousemove', handleMouseMove);
      ref.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return ref;
}
