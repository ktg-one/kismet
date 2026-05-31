"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { useClientReducedMotion } from "@/hooks/useClientReducedMotion";

const COARSE_QUERY = "(pointer: coarse)";

function subscribeCoarse(callback: () => void): () => void {
  const mq = window.matchMedia(COARSE_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getCoarseSnapshot(): boolean {
  return window.matchMedia(COARSE_QUERY).matches;
}

function getCoarseServerSnapshot(): boolean {
  return false;
}

/** Touch / coarse-pointer detection via useSyncExternalStore — no
 * setState-in-effect, hydration-safe (server renders the no-touch snapshot). */
function useCoarsePointer(): boolean {
  return useSyncExternalStore(subscribeCoarse, getCoarseSnapshot, getCoarseServerSnapshot);
}

/**
 * Lightweight premium cursor (awwwards-animations: lerp-follow via gsap.ticker).
 * A small gold dot tracks the pointer tightly; a larger ring trails behind it.
 * Both use mix-blend-difference so they read on navy and on gold. The native
 * cursor is left intact (accessibility). Disabled on touch (coarse pointer) and
 * when reduced motion is requested.
 */
export function CustomCursor() {
  const reduce = useClientReducedMotion();
  const coarse = useCoarsePointer();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const enabled = !reduce && !coarse;

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const d = { ...target };
    const r = { ...target };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = () => {
      d.x += (target.x - d.x) * 0.35;
      d.y += (target.y - d.y) * 0.35;
      r.x += (target.x - r.x) * 0.15;
      r.y += (target.y - r.y) * 0.15;
      gsap.set(dot, { x: d.x, y: d.y });
      gsap.set(ring, { x: r.x, y: r.y });
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-9 w-9 rounded-full border border-gold/70 mix-blend-difference"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-gold mix-blend-difference"
      />
    </>
  );
}
