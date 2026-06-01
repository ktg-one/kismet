"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
  travel = 6,
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
            scrub: 0.6,
          },
        }
      );
    },
    { scope: ref, dependencies: [travel] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
