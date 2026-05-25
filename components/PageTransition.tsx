"use client";
import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Cinematic route-level transition. Replaces hard cuts with a calm dissolve.
 * Uses pathname as key, so each route remount triggers the transition.
 *
 * Tuning notes:
 * - 0.85s duration with cinema ease feels deliberate without dragging
 * - Subtle scale (0.992 -> 1) plus y-shift (12 -> 0) reads as "settling into place"
 *   rather than "appearing"; small enough to never feel showy
 * - Reduced motion: no animation, instant render
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12, scale: 0.992, filter: "blur(2px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        scale: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
        filter: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {children}
    </motion.div>
  );
}
