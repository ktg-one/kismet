import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

interface DeclarationProps {
  eyebrow?: string;
  statement: ReactNode;
  signoff?: ReactNode;
}

/**
 * Light-tone declaration section. Breaks the dark palette rhythm with a single editorial statement.
 * Cream surface, navy serif type, gold hairline. Used sparingly — once per page max.
 */
export function Declaration({
  eyebrow = "A quiet declaration",
  statement,
  signoff,
}: DeclarationProps) {
  return (
    <section
      className="relative"
      style={{
        background:
          "radial-gradient(ellipse 1200px 700px at 30% 0%, #FAF6EC 0%, #F2EBDC 60%, #E8DFCB 100%)",
        color: "#0A1A32",
      }}
    >
      {/* Top hairline */}
      <div
        aria-hidden
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(164, 115, 8, 0.4) 50%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="hidden md:block col-span-1">
            <div
              aria-hidden
              className="h-20"
              style={{
                width: "1px",
                background:
                  "linear-gradient(180deg, rgba(164, 115, 8, 0), rgba(164, 115, 8, 0.7) 35%, rgba(164, 115, 8, 0))",
              }}
            />
          </div>

          <div className="col-span-12 md:col-span-10">
            <Reveal>
              <div
                className="text-[10px] uppercase tracking-[0.32em] mb-10"
                style={{ color: "rgba(164, 115, 8, 0.85)" }}
              >
                {eyebrow}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p
                className="font-serif tracking-[-0.014em] leading-[1.18] max-w-4xl"
                style={{
                  fontSize: "clamp(2rem, 4.5vw + 0.5rem, 3.6rem)",
                  color: "#0A1A32",
                }}
              >
                {statement}
              </p>
            </Reveal>

            {signoff && (
              <Reveal delay={0.2}>
                <div
                  className="mt-12 md:mt-16 flex items-center gap-5 text-[12px] uppercase tracking-[0.28em]"
                  style={{ color: "rgba(10, 26, 50, 0.55)" }}
                >
                  <span
                    aria-hidden
                    className="h-px w-10"
                    style={{ background: "rgba(164, 115, 8, 0.55)" }}
                  />
                  <span>{signoff}</span>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>

      {/* Bottom hairline */}
      <div
        aria-hidden
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(164, 115, 8, 0.4) 50%, transparent)",
        }}
      />
    </section>
  );
}
