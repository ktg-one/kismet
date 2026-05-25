"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Cinematic route-level transition. Replaces hard cuts with a calm dissolve
 * on the way in AND a brief exit fade on the way out, so navigation reads
 * as a deliberate cut, not a hard swap.
 *
 * Tuning:
 * - Enter ~0.85s with cinema ease — "settling into place"
 * - Exit ~0.32s (about a third of enter) — felt, not dwelt on
 * - mode="wait" so the old page leaves before the new one enters,
 *   preventing visual overlap mid-fade
 * - Reduced motion: no animation, instant render
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion() ?? false;
  const initial = { opacity: 0, y: 12, scale: 0.992, filter: "blur(2px)" };
  const animate = { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" };
  // Exit carries its own transition so the leave is ~a third of the enter.
  const exit = reduce
    ? { opacity: 0, transition: { duration: 0 } }
    : {
        opacity: 0,
        y: -8,
        filter: "blur(2px)",
        transition: { duration: 0.32, ease: [0.7, 0, 0.84, 0] as const },
      };
  const transition = reduce
    ? { duration: 0 }
    : {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const,
        scale: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const },
        filter: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
