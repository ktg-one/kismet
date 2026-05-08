import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

interface Mark {
  label: string;
  /** Optional secondary tone, e.g. small italic. */
  meta?: string;
}

/**
 * Hairline-thin authority strip. Sits between hero and content.
 * Reads as a publication masthead or watch dial: calm, factual, established.
 */
export function SignatureStrip({
  marks,
  children,
}: {
  marks?: Mark[];
  children?: ReactNode;
}) {
  return (
    <section className="relative">
      <div className="rule-fade" />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 py-12 md:py-14">
            {marks?.map((m, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 border-l border-white/[0.08] pl-5 md:border-l-0 md:border-t md:border-white/[0.08] md:pl-0 md:pt-6"
              >
                <span className="text-[10px] uppercase tracking-[0.28em] text-gold/80">
                  {m.label}
                </span>
                {m.meta && (
                  <span className="font-serif text-[15px] md:text-[16px] text-white/85 italic tracking-[-0.005em]">
                    {m.meta}
                  </span>
                )}
              </div>
            ))}
            {children}
          </div>
        </Reveal>
      </div>
      <div className="rule-fade-soft" />
    </section>
  );
}
