"use client";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useRef } from "react";
import type { ReactNode } from "react";

interface MagneticCTAProps {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

/**
 * Premium magnetic-feel CTA. Subtle pull toward cursor on hover.
 * Restraint is the point: 6px max travel, slow spring, easy to miss but felt.
 */
export function MagneticCTA({ href, children, className = "", ariaLabel }: MagneticCTAProps) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 130, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 130, damping: 18, mass: 0.6 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.18);
    y.set(dy * 0.22);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      style={reduce ? { x: 0, y: 0 } : { x: springX, y: springY }}
      className="inline-block"
    >
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        aria-label={ariaLabel}
        className={`cta-gold ${className}`}
      >
        {children}
      </Link>
    </motion.span>
  );
}
