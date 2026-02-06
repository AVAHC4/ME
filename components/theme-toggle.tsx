'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Moon from './icons/Moon';
import Sun from './icons/Sun';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isAnimating) return;

      setIsAnimating(true);
      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Create a full-screen overlay for the circle-expand animation
      const transition = document.createElement('div');
      transition.style.position = 'fixed';
      transition.style.inset = '0';
      transition.style.zIndex = '9999';
      transition.style.pointerEvents = 'none';
      transition.style.backgroundColor =
        resolvedTheme === 'light' ? 'oklch(0.145 0 0)' : 'oklch(1 0 0)';
      transition.style.clipPath = 'circle(0% at var(--x) var(--y))';
      transition.style.transition = 'clip-path 600ms ease-in-out';
      transition.style.setProperty('--x', `${x}px`);
      transition.style.setProperty('--y', `${y}px`);

      document.body.appendChild(transition);

      // Start expanding the circle
      requestAnimationFrame(() => {
        transition.style.clipPath = 'circle(150% at var(--x) var(--y))';
      });

      // Wait for midpoint, then swap theme
      await new Promise((resolve) => setTimeout(resolve, 300));

      const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);

      // Wait for animation to finish, then clean up
      await new Promise((resolve) => setTimeout(resolve, 300));
      transition.remove();
      setIsAnimating(false);
    },
    [resolvedTheme, isAnimating, setTheme],
  );

  if (!mounted) {
    return (
      <button
        className="relative flex h-8 w-8 items-center justify-center overflow-hidden transition-opacity hover:opacity-80 hover:cursor-pointer"
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      disabled={isAnimating}
      className={`relative flex h-8 w-8 items-center justify-center overflow-hidden transition-opacity hover:opacity-80 ${className} hover:cursor-pointer`}
      aria-label="Toggle theme"
    >
      <Sun
        className={`absolute h-5 w-5 text-foreground transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${resolvedTheme === 'dark'
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-5 scale-50 opacity-0'
          }`}
      />
      <Moon
        className={`absolute h-5 w-5 text-foreground transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${resolvedTheme === 'light'
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-5 scale-50 opacity-0'
          }`}
      />
    </button>
  );
}
