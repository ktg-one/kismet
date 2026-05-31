"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useClientReducedMotion } from "@/hooks/useClientReducedMotion";
import { useEffect, useState, useSyncExternalStore } from "react";

interface HeroAmbientProps {
  /** Larger, brighter orbs on the home hero; quieter on sub-pages. */
  prominent?: boolean;
}

// px of drift. The deeper navy orb travels further than the gold so the two
// layers separate into depth. Both tiny against ~900px orbs: felt, not noticed.
const TRAVEL_GOLD = 14;
const TRAVEL_NAVY = 24;

const subscribeToHydration = () => () => {};
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

/** True only after the first client paint. Lets SSR and the first client
 * render emit the SAME tree, so enabling motion never trips hydration. */
function useHasHydrated() {
  return useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot
  );
}

/**
 * Ambient gold + navy orbs behind the hero. On fine-pointer devices they
 * drift gently with and against the cursor to give the hero depth. Travel is
 * hard-clamped and the spring is slow and overshoot-free, so the motion stays
 * calm and never bouncy (DESIGN_GUIDE: subtle, never excessive).
 *
 * Isolated Motion leaf on purpose: Hero drives GSAP ScrollTrigger work, so the
 * pointer physics live here to keep the two animation engines out of one
 * component tree.
 *
 * Hydration parity: the server and the first client render always emit the
 * static tree (no will-change, no transform), matching Reveal's approach. The
 * pointer drift only attaches AFTER hydration, and only when the device has a
 * fine pointer and reduced-motion is off. So coarse-pointer and reduced-motion
 * users keep the static orbs, and no path mismatches SSR.
 */
export function HeroAmbient({ prominent = false }: HeroAmbientProps) {
  const reduce = useClientReducedMotion();
  const hasHydrated = useHasHydrated();
  // Lazy-read the pointer type. Server returns false; the real value lands on
  // first client render. Safe because `active` below is gated on hasHydrated,
  // so coarse never affects the first-paint tree (no hydration mismatch).
  const [coarse, setCoarse] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const handler = (e: MediaQueryListEvent) => setCoarse(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Only drift once hydrated, on a fine pointer, with motion allowed. Until
  // then the tree is static and identical to the server render.
  const active = hasHydrated && !reduce && !coarse;

  // Normalized pointer position, -1 to 1 around the viewport centre.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 55, damping: 22, mass: 0.9 });
  const sy = useSpring(py, { stiffness: 55, damping: 22, mass: 0.9 });

  const goldX = useTransform(sx, [-1, 1], [TRAVEL_GOLD, -TRAVEL_GOLD]);
  const goldY = useTransform(sy, [-1, 1], [TRAVEL_GOLD, -TRAVEL_GOLD]);
  const navyX = useTransform(sx, [-1, 1], [-TRAVEL_NAVY, TRAVEL_NAVY]);
  const navyY = useTransform(sy, [-1, 1], [-TRAVEL_NAVY, TRAVEL_NAVY]);

  useEffect(() => {
    if (!active) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [active, px, py]);

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <motion.div
        className={`ambient-orb ambient-orb-gold${active ? " will-change-transform" : ""}`}
        style={{
          top: "-12%",
          right: "-8%",
          width: prominent ? "62vw" : "44vw",
          height: prominent ? "62vw" : "44vw",
          maxWidth: prominent ? "900px" : "640px",
          maxHeight: prominent ? "900px" : "640px",
          opacity: prominent ? 0.7 : 0.38,
          ...(active ? { x: goldX, y: goldY } : null),
        }}
      />
      <motion.div
        className={`ambient-orb ambient-orb-navy${active ? " will-change-transform" : ""}`}
        style={{
          bottom: "-18%",
          left: "-12%",
          width: prominent ? "70vw" : "50vw",
          height: prominent ? "70vw" : "50vw",
          maxWidth: prominent ? "1000px" : "720px",
          maxHeight: prominent ? "1000px" : "720px",
          opacity: prominent ? 0.65 : 0.32,
          ...(active ? { x: navyX, y: navyY } : null),
        }}
      />
    </div>
  );
}
