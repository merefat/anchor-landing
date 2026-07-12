'use client';

import { useRef, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function DataFlowParticles({ isActive = true, mousePosition = { x: 0, y: 0 } }) {
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    if (reducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class with ring buffer trail and cached gradients
    const gradientCache = new Map();

    class Particle {
      constructor() {
        this.trail = new Array(10);
        this.trailLen = 0;
        this.trailHead = 0;
        this.reset();
      }

      reset() {
        // Start from top-right area
        this.x = canvas.offsetWidth * 0.8 + Math.random() * 100;
        this.y = -20;
        this.size = Math.random() * 3 + 2;
        this.speedX = -1 - Math.random() * 2;
        this.speedY = 1 + Math.random() * 1.5;
        this.opacity = 0;
        this.maxOpacity = 0.4 + Math.random() * 0.4;
        this.color = Math.random() > 0.5 ? '#7c3aed' : '#1ebbd4';
        this.trailLen = 5 + Math.floor(Math.random() * 5);
        this.trailHead = 0;
        this.trailFilled = false;
      }

      update() {
        // Mouse influence - accelerate on hover
        const mouseInfluence = Math.abs(mousePosition.x) + Math.abs(mousePosition.y);
        const speedMultiplier = 1 + mouseInfluence * 0.5;

        this.x += this.speedX * speedMultiplier;
        this.y += this.speedY * speedMultiplier;

        // Fade in
        if (this.opacity < this.maxOpacity) {
          this.opacity += 0.02;
        }

        // Ring buffer trail — O(1) instead of O(n) shift
        this.trail[this.trailHead] = { x: this.x, y: this.y, opacity: this.opacity };
        this.trailHead = (this.trailHead + 1) % this.trailLen;
        if (!this.trailFilled && this.trailHead === 0) this.trailFilled = true;

        // Reset if off screen
        if (this.x < -50 || this.y > canvas.offsetHeight + 50) {
          this.reset();
        }
      }

      draw() {
        // Draw trail using ring buffer
        const count = this.trailFilled ? this.trailLen : this.trailHead;
        for (let i = 0; i < count; i++) {
          const idx = this.trailFilled ? (this.trailHead + i) % this.trailLen : i;
          const point = this.trail[idx];
          if (!point) continue;
          const trailOpacity = (i / count) * this.opacity * 0.5;
          ctx.beginPath();
          ctx.arc(point.x, point.y, this.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.globalAlpha = trailOpacity;
          ctx.fill();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();

        // Glow effect with cached gradient
        const glowKey = `${this.color}_${this.size}`;
        let gradient = gradientCache.get(glowKey);
        if (!gradient) {
          const offscreen = document.createElement('canvas');
          offscreen.width = offscreen.height = Math.ceil(this.size * 4);
          const offCtx = offscreen.getContext('2d');
          const cx = offscreen.width / 2;
          gradient = offCtx.createRadialGradient(cx, cx, 0, cx, cx, this.size * 2);
          gradient.addColorStop(0, this.color);
          gradient.addColorStop(1, 'transparent');
          offCtx.fillStyle = gradient;
          offCtx.fillRect(0, 0, offscreen.width, offscreen.height);
          gradientCache.set(glowKey, offscreen);
        }
        const img = gradientCache.get(glowKey);
        ctx.globalAlpha = this.opacity * 0.3;
        ctx.drawImage(img, this.x - img.width / 2, this.y - img.height / 2);

        ctx.globalAlpha = 1;
      }
    }

    // Create particles
    const particleCount = 30;
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      const particle = new Particle();
      // Stagger initial positions
      particle.y = Math.random() * canvas.offsetHeight;
      particlesRef.current.push(particle);
    }

    // Animation loop
    const animate = () => {
      if (!isActive) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, mousePosition, reducedMotion]);

  if (reducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
}
