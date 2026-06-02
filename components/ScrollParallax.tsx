"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SHOW_SCROLL_MARKERS = process.env.NODE_ENV !== "production";

/**
 * GSAP ScrollTrigger scrub parallax (awwwards-animations / gsap-scrolltrigger).
 * The wrapped element drifts vertically as its section crosses the viewport,
 * scrubbed to scroll position. Rides the Lenis -> gsap.ticker bridge in
 * SmoothScroll, so it stays in sync with the smooth scroll (a plain CSS
 * scroll-timeline does not). Give the inner media a little overscale and a
 * clipped parent so the travel never reveals a gap.
 */
export function ScrollParallax({
  children,
  className,
  travel = 18,
}: {
  children: ReactNode;
  className?: string;
  /** Total vertical drift in % of element height (split +/- around centre). */
  travel?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          ref.current,
          { yPercent: -Math.max(12, travel - 6) },
          {
            yPercent: Math.max(12, travel - 6),
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
              markers: SHOW_SCROLL_MARKERS,
            },
          }
        );
      });

      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          ref.current,
          { yPercent: -travel },
          {
            yPercent: travel,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
              markers: SHOW_SCROLL_MARKERS,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [travel] }
  );

  return (
    <div ref={ref} className={`will-change-transform ${className ?? ""}`.trim()}>
      {children}
    </div>
  );
}
