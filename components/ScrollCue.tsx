"use client";
import { motion, useReducedMotion } from "motion/react";

export function ScrollCue({ label = "Scroll" }: { label?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={reduce ? undefined : { opacity: 1 }}
      transition={{ duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-4 select-none"
      aria-hidden
    >
      <span className="text-[9px] uppercase tracking-[0.36em] text-white/35">{label}</span>
      <span className="scroll-cue-line" />
    </motion.div>
  );
}
