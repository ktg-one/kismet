"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Bridges Lenis's RAF into GSAP's ticker so ScrollTrigger reads the
 * smoothed scroll position. Without this, ScrollTrigger calculations
 * drift against the visual scroll.
 */
function LenisGsapBridge() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    const update = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Dev-only: expose Lenis + ScrollTrigger so the observer agent can read
    // scroll state (ScrollTrigger.getAll(), lenis.scrollTo) via evaluate_script.
    // Never runs in production builds.
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as Record<string, unknown>).__lenis = lenis;
      (window as unknown as Record<string, unknown>).ScrollTrigger = ScrollTrigger;
    }

    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  // Recompute trigger start/end once layout settles: self-hosted Berlingske
  // webfonts and Next/Image can shift positions after first paint.
  useEffect(() => {
    const refresh = () => {
      requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
    };
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(refresh);
    }
    window.addEventListener("load", refresh);
    refresh();
    return () => window.removeEventListener("load", refresh);
  }, [pathname]);

  return null;
}

/**
 * Document-level smooth scroll. `autoRaf: false` hands the RAF loop to
 * gsap.ticker via LenisGsapBridge so Lenis and ScrollTrigger share one
 * source of truth. Touch keeps native momentum.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        autoRaf: false,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
