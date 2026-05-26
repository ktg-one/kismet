"use client";
import { motion, useReducedMotion } from "motion/react";

export function ScrollCue({ label = "Scroll" }: { label?: string }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] as const }
      }
      className="flex flex-col items-center gap-4 select-none"
      aria-hidden
    >
      <span className="text-[9px] uppercase tracking-[0.36em] text-white/35">{label}</span>
      <span className="scroll-cue-line" />
    </motion.div>
  );
}
