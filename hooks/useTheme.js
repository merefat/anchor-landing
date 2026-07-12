'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

function getTheme() {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') || 'dark';
}

function subscribe(callback) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === 'data-theme') {
        callback();
        break;
      }
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  return () => observer.disconnect();
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, () => 'dark');
}

export function useIsLight() {
  return useTheme() === 'light';
}
