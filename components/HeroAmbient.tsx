interface HeroAmbientProps {
  /** Larger, brighter orbs on the home hero; quieter on sub-pages. */
  prominent?: boolean;
}

/**
 * Ambient background orbs behind the hero. The gold orb is a slowly rotating,
 * drifting conic gradient — a moving gradient glow — and the navy orb is a
 * quieter counter-drift for depth. Motion is pure CSS (see the `.ambient-orb-*`
 * rules in globals.css), so it stays on the compositor and is auto-disabled
 * under prefers-reduced-motion by the global reduce block. No JS needed.
 */
export function HeroAmbient({ prominent = false }: HeroAmbientProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="ambient-orb ambient-orb-gold"
        style={{
          top: "-12%",
          right: "-8%",
          width: prominent ? "62vw" : "44vw",
          height: prominent ? "62vw" : "44vw",
          maxWidth: prominent ? "900px" : "640px",
          maxHeight: prominent ? "900px" : "640px",
          opacity: prominent ? 0.88 : 0.52,
        }}
      />
      <div
        className="ambient-orb ambient-orb-navy"
        style={{
          bottom: "-18%",
          left: "-12%",
          width: prominent ? "70vw" : "50vw",
          height: prominent ? "70vw" : "50vw",
          maxWidth: prominent ? "1000px" : "720px",
          maxHeight: prominent ? "1000px" : "720px",
          opacity: prominent ? 0.48 : 0.28,
        }}
      />
    </div>
  );
}
