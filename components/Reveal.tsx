"use client";
import { motion, useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";

const subscribeToHydration = () => () => {};
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "header" | "p" | "span";
  y?: number;
  duration?: number;
  immediate?: boolean;
}

/**
 * Reveal renders the SAME motion.tag tree regardless of reduced-motion so
 * SSR and first client render line up. Only the motion props change once
 * useReducedMotion() resolves on the client; that swap happens after
 * hydration and never triggers a mismatch.
 *
 * When `immediate` is true, the element animates on mount (used by the
 * hero so the headline is settled-in by the time anything else moves).
 * Otherwise it animates on scroll-into-view.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  y = 12,
  duration = 0.6,
  immediate = false,
}: RevealProps) {
  const reduce = useReducedMotion();
  const hasHydrated = useHasHydrated();
  const shouldReduceMotion = hasHydrated && reduce;
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y }}
      animate={immediate && !shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={!immediate && !shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
    >
      {children}
    </MotionTag>
  );
}

interface RevealWordsProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  immediate?: boolean;
}

function RevealWord({
  word,
  delay,
  immediate,
  reduce,
}: {
  word: string;
  delay: number;
  immediate: boolean;
  reduce: boolean | null;
}) {
  return (
    <motion.span
      className="inline-block"
      initial={
        reduce || immediate ? { y: 0, opacity: 1 } : { y: "80%", opacity: 0 }
      }
      animate={
        immediate && !reduce ? { y: 0, opacity: 1 } : undefined
      }
      whileInView={
        !immediate && !reduce ? { y: 0, opacity: 1 } : undefined
      }
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: reduce ? 0 : 0.72,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
    >
      {word}
    </motion.span>
  );
}

/**
 * Word-by-word stagger reveal. Used for headlines. Each word fades up with
 * a small delay offset. aria-label exposes the full string to screen
 * readers; per-word spans are aria-hidden so AT users hear the headline
 * as one phrase.
 */
export function RevealWords({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
  as = "h1",
  immediate = false,
}: RevealWordsProps) {
  const reduce = useReducedMotion();
  const hasHydrated = useHasHydrated();
  const shouldReduceMotion = hasHydrated && reduce;
  const Tag = as as keyof React.JSX.IntrinsicElements;
  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-baseline"
          style={{ marginRight: i === words.length - 1 ? 0 : "0.28em" }}
        >
          <RevealWord
            word={word}
            delay={delay + i * stagger}
            immediate={immediate}
            reduce={shouldReduceMotion}
          />
        </span>
      ))}
    </Tag>
  );
}

function useHasHydrated() {
  return useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot
  );
}
