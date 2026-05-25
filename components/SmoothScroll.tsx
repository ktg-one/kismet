"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Document-level smooth scroll. Skips wheel smoothing on touch devices so
 * native momentum is preserved, and the existing `prefers-reduced-motion`
 * media rule in globals.css covers users who've opted out of motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
