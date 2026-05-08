/**
 * Hairline editorial masthead. Sits above the nav.
 *
 * The point: in 1px of vertical space, set the publication tone.
 * Reads as the printed top-line of a serious quarterly. Always present, almost not.
 *
 * Typography is intentionally micro: 8.5px caps, 0.36em tracking, gold/55 over a
 * gradient hairline rule. On mobile it carries fewer marks (3 of 4) so it never wraps.
 */
export function Masthead() {
  return (
    <div
      aria-hidden
      className="hidden sm:block relative z-[40] bg-[#08152A]/85 backdrop-blur-md border-b border-white/[0.05]"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-center justify-between gap-6 py-2.5">
          <span className="font-serif italic text-[10px] tracking-[0.36em] uppercase text-gold/70">
            Kismet Finance Group
          </span>

          <div className="hidden md:flex items-center gap-7 text-[8.5px] tracking-[0.38em] uppercase text-white/45 tabular-nums">
            <span>Vol. I — MMXXIV</span>
            <span aria-hidden className="h-px w-6 bg-gold/30" />
            <span>Australia</span>
            <span aria-hidden className="h-px w-6 bg-gold/30" />
            <span>By appointment</span>
          </div>

          <div className="md:hidden text-[8.5px] tracking-[0.36em] uppercase text-white/45 tabular-nums">
            Vol. I — MMXXIV
          </div>
        </div>
      </div>
    </div>
  );
}
