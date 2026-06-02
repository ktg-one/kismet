"use client";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, useEffect, useState } from "react";
import type { ReactNode } from "react";

const MAX_TRAVEL = 6; // px — enforces JSDoc contract

interface MagneticCTAProps {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

/**
 * Premium magnetic-feel CTA. Subtle pull toward cursor on hover.
 * Restraint is the point: 6px max travel, slow spring, easy to miss but felt.
 * Disabled on coarse-pointer (touch) devices.
 */
export function MagneticCTA({ href, children, className = "", ariaLabel }: MagneticCTAProps) {
  const [coarsePointer, setCoarsePointer] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
  );
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const handler = (e: MediaQueryListEvent) => setCoarsePointer(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const disabled = coarsePointer;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 130, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 130, damping: 18, mass: 0.6 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.min(Math.abs(dx) * 0.18, MAX_TRAVEL) * Math.sign(dx));
    y.set(Math.min(Math.abs(dy) * 0.22, MAX_TRAVEL) * Math.sign(dy));
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      style={disabled ? { x: 0, y: 0 } : { x: springX, y: springY }}
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
