"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";

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
 * Reveal animates its children into place.
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
  y = 28,
  duration = 0.7,
  immediate = false,
}: RevealProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      animate={immediate ? { opacity: 1, y: 0 } : undefined}
      whileInView={!immediate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        delay,
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
}: {
  word: string;
  delay: number;
  immediate: boolean;
}) {
  return (
    <motion.span
      className="inline-block"
      initial={immediate ? { y: 0, opacity: 1 } : { y: "80%", opacity: 0 }}
      animate={immediate ? { y: 0, opacity: 1 } : undefined}
      whileInView={!immediate ? { y: 0, opacity: 1 } : undefined}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.72,
        delay,
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
          />
        </span>
      ))}
    </Tag>
  );
}
