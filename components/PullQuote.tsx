import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

interface PullQuoteProps {
  children: ReactNode;
  attribution?: string;
  variant?: "default" | "dim";
}

/**
 * Editorial pull quote. Used as a calm interrupt within long-form content.
 * Larger serif, generous space, gold rule above.
 */
export function PullQuote({ children, attribution, variant = "default" }: PullQuoteProps) {
  return (
    <Reveal>
      <figure className="relative my-20 md:my-28 max-w-3xl mx-auto px-6">
        <div
          aria-hidden
          className="h-px w-16 bg-gold/60 mb-10"
        />
        <blockquote
          className={`font-serif tracking-[-0.012em] leading-[1.18] text-[1.875rem] md:text-[2.5rem] ${
            variant === "dim" ? "text-white/72" : "text-white"
          }`}
        >
          {children}
        </blockquote>
        {attribution && (
          <figcaption className="mt-8 text-[10px] uppercase tracking-[0.24em] text-gold/85">
            {attribution}
          </figcaption>
        )}
      </figure>
    </Reveal>
  );
}
