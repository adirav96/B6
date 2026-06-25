'use client';
import { useState, useEffect } from 'react';

export function useDarkMode() {
  // start false to avoid a flash of dark on SSR — effect will correct it immediately
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('darkMode') === 'true';
    setDark(stored);
    document.documentElement.classList.toggle('dark', stored);
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      localStorage.setItem('darkMode', String(next));
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  return { dark, toggle };
}
