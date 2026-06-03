"use client";
import { useRef, type ReactNode, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const REVEAL_EASE = "power3.out";
// Fire a touch before the element is fully in view so the reveal feels responsive.
const REVEAL_START = "top 85%";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "header" | "p" | "span";
  y?: number;
  duration?: number;
  immediate?: boolean;
}

/**
 * Reveal animates its children into place with GSAP — play-once, never scrubbed.
 *
 * Scroll-into-view content is driven by a real GSAP `ScrollTrigger`
 * (`toggleActions: "play none none none"`), which is the contract this site
 * is built to: scrolling activates the motion. Scrubbed/scroll-coupled motion
 * lives in `ScrollReveal`/`ScrollParallax` (cards, photos) — use those for
 * wrappers; use `Reveal` for headings, paragraphs and bullets.
 *
 * When `immediate` is true the element animates on mount instead (used by the
 * hero, whose content is above the fold and can't be scroll-triggered).
 *
 * The hidden start state is applied by GSAP inside `useGSAP`'s layout effect
 * (before paint), never in the rendered markup — so with JS the reveal plays
 * flash-free, and without JS the content stays fully visible.
 *
 * Reads scroll through the shared Lenis -> gsap.ticker bridge in SmoothScroll
 * (never its own RAF). Cleanup is handled by useGSAP.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  y = 100,
  duration = 0.7,
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.from(el, {
        y,
        autoAlpha: 0,
        duration,
        delay,
        ease: REVEAL_EASE,
        scrollTrigger: immediate
          ? undefined
          : {
              trigger: el,
              start: REVEAL_START,
              toggleActions: "play none none none",
            },
      });
    },
    { scope: ref, dependencies: [y, delay, duration, immediate] }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
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

/**
 * Word-by-word stagger reveal for headlines, driven by GSAP ScrollTrigger.
 * Each word slides up out of an overflow-hidden mask and fades in, staggered.
 * aria-label exposes the full string; per-word spans are aria-hidden so AT
 * users hear the headline as one phrase.
 *
 * When `immediate` the words render in place (no reveal) so the hero headline
 * is settled by load — above-the-fold content can't be scroll-triggered.
 */
export function RevealWords({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
  as = "h1",
  immediate = false,
}: RevealWordsProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;
  const words = text.split(" ");

  useGSAP(
    () => {
      if (immediate) return;
      const el = ref.current;
      if (!el) return;
      const wordEls = el.querySelectorAll<HTMLElement>(".reveal-word");
      gsap.from(wordEls, {
        yPercent: 80,
        autoAlpha: 0,
        duration: 0.72,
        ease: REVEAL_EASE,
        delay,
        stagger,
        scrollTrigger: {
          trigger: el,
          start: REVEAL_START,
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref, dependencies: [immediate, delay, stagger] }
  );

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-baseline"
          style={{ marginRight: i === words.length - 1 ? 0 : "0.28em" }}
        >
          <span className="reveal-word inline-block">{word}</span>
        </span>
      ))}
    </Tag>
  );
}
