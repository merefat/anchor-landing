'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function WordReveal({ text, className = '', delay = 0, stagger = 60 }) {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const words = containerRef.current.querySelectorAll('.word-reveal');
    
    words.forEach((word, index) => {
      word.style.animationDelay = `${delay + (index * stagger)}ms`;
    });
  }, [delay, stagger, reducedMotion]);

  const words = text.split(' ');

  return (
    <span ref={containerRef} className={className}>
      {words.map((word, index) => (
        <span key={index} className="word-reveal">
          {word}
          {index < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
}
