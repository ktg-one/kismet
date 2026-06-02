"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SHOW_SCROLL_MARKERS = process.env.NODE_ENV !== "production";

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
 * opacity only (60fps, no layout). Cleanup is handled by useGSAP.
 */
export function ScrollReveal({ children, className, y = 120 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          el,
          { y: Math.max(80, y - 24), autoAlpha: 0, scale: 0.9 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 94%",
              end: () => "+=100%",
              scrub: 1,
              invalidateOnRefresh: true,
              markers: SHOW_SCROLL_MARKERS,
            },
          }
        );
      });

      mm.add("(min-width: 768px)", () => {
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
              end: () => "+=100%",
              scrub: 1,
              invalidateOnRefresh: true,
              markers: SHOW_SCROLL_MARKERS,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [y] }
  );

  return (
    <div ref={ref} className={`will-change-transform ${className ?? ""}`.trim()}>
      {children}
    </div>
  );
}
