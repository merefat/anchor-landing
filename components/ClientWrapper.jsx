'use client';

import { useLenis } from '@/lib/lenis';

export default function ClientWrapper({ children }) {
  useLenis();
  return <>{children}</>;
}
