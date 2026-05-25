"use client";
import { motion, useReducedMotion } from "motion/react";
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

export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  y = 22,
  duration = 0.85,
  immediate = false,
}: RevealProps) {
  const reduce = useReducedMotion() ?? false;
  const MotionTag = motion[as];
  const initial = { opacity: 0, y };
  const animate = immediate || reduce ? { opacity: 1, y: 0 } : undefined;
  const whileInView = immediate || reduce ? undefined : { opacity: 1, y: 0 };
  const transition = reduce
    ? { duration: 0 }
    : { duration, delay, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <MotionTag
      className={className}
      initial={initial}
      animate={animate}
      whileInView={whileInView}
      viewport={{ once: true, amount: 0.18 }}
      transition={transition}
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
  reduce: boolean;
}) {
  return (
    <motion.span
      className="inline-block will-change-transform"
      initial={immediate || reduce ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
      animate={immediate || reduce ? { y: 0, opacity: 1 } : undefined}
      whileInView={immediate || reduce ? undefined : { y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={
        reduce
          ? { duration: 0 }
          : {
              duration: 0.95,
              delay,
              ease: [0.16, 1, 0.3, 1] as const,
            }
      }
    >
      {word}
    </motion.span>
  );
}

/**
 * Word-by-word stagger reveal. Used for headlines.
 * Each word fades up with a small delay offset.
 * Aria-label on the parent so screen readers read the full string.
 */
export function RevealWords({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
  as = "h1",
  immediate = false,
}: RevealWordsProps) {
  const reduce = useReducedMotion() ?? false;
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
            reduce={reduce}
          />
        </span>
      ))}
    </Tag>
  );
}
