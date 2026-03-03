'use client';

import { useEffect, useState } from 'react';
import Loading from '@/app/loading';

export default function SplashGate({ children }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const key = 'danmedy_splash_shown';
    try {
      const alreadyShown = sessionStorage.getItem(key) === '1';
      if (alreadyShown) {
        setShowSplash(false);
        return;
      }

      const t = setTimeout(() => {
        sessionStorage.setItem(key, '1');
        setShowSplash(false);
      }, 2000);

      return () => clearTimeout(t);
    } catch {
      const t = setTimeout(() => setShowSplash(false), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  if (showSplash) return <Loading />;
  return children;
}
