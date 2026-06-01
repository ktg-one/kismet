"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Vertical settle distance in px (default 56). */
  y?: number;
}

/**
 * Scroll-DRIVEN reveal for cards and photos. The element's progress is tied
 * 1:1 to scroll position via ScrollTrigger `scrub`, so scrolling IS the
 * animation — scroll back up and it un-resolves. That scroll-coupling is the
 * difference from the Motion `Reveal` (which fires once on enter and plays a
 * fixed-duration tween); use ScrollReveal on card/photo wrappers so the page
 * reads as "scroll moves it".
 *
 * Rides the shared Lenis -> gsap.ticker bridge in SmoothScroll (never its own
 * RAF), so it stays in sync with the smooth scroll. Animates transform +
 * opacity only (60fps, no layout). Cleanup is handled by useGSAP. Motion is
 * intentionally unconditional — this site does not gate on prefers-reduced-motion.
 */
export function ScrollReveal({ children, className, y = 120 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { y, autoAlpha: 0, scale: 0.9 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "top 48%",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: ref, dependencies: [y] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
