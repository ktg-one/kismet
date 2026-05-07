import Image from "next/image";
import { Reveal } from "./Reveal";

interface PhotoProps {
  src: string;
  alt: string;
  caption?: string;
  meta?: string;
  /** Aspect ratio class. Default 16/10. */
  aspect?: "16/10" | "16/9" | "4/5" | "3/2" | "21/9" | "5/4";
  /** Visual treatment. */
  treatment?: "default" | "duotone" | "warm";
  priority?: boolean;
  /** Sizes attribute for responsive loading. */
  sizes?: string;
  /** Wrap in Reveal. */
  reveal?: boolean;
}

/**
 * Editorial photo. Slight desaturation by default, subtle scale + restore on hover.
 * Gold hairline at the bottom, optional caption + meta block underneath.
 * Designed to read as documentary, not stock.
 */
export function Photo({
  src,
  alt,
  caption,
  meta,
  aspect = "16/10",
  treatment = "default",
  priority = false,
  sizes = "(min-width: 1024px) 1100px, (min-width: 768px) 90vw, 100vw",
  reveal = true,
}: PhotoProps) {
  // 21/9 is too thin on phones - bump to 16/9 on mobile.
  const aspectClass =
    aspect === "16/10"
      ? "aspect-[5/4] md:aspect-[16/10]"
      : aspect === "16/9"
        ? "aspect-[4/3] md:aspect-[16/9]"
        : aspect === "4/5"
          ? "aspect-[4/5]"
          : aspect === "3/2"
            ? "aspect-[4/3] md:aspect-[3/2]"
            : aspect === "21/9"
              ? "aspect-[16/9] md:aspect-[21/9]"
              : "aspect-[5/4]";

  const treatmentClass =
    treatment === "duotone"
      ? "brightness-[0.85] saturate-[0.55] contrast-[1.05] group-hover:brightness-100 group-hover:saturate-100"
      : treatment === "warm"
        ? "brightness-[0.95] saturate-[0.95] contrast-[1.02] group-hover:brightness-100 group-hover:saturate-110"
        : "brightness-[0.92] saturate-[0.92] group-hover:brightness-100 group-hover:saturate-100";

  const inner = (
    <figure className="group">
      <div className={`relative ${aspectClass} overflow-hidden kismet-surface`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover transition-[filter,transform] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015] ${treatmentClass}`}
        />
        {/* Subtle navy wash to settle the image into the brand atmosphere. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.18] transition-opacity duration-1000 group-hover:opacity-[0.06]"
          style={{
            background:
              "linear-gradient(180deg, rgba(8, 21, 42, 0.45) 0%, rgba(8, 21, 42, 0.05) 30%, rgba(8, 21, 42, 0.05) 70%, rgba(8, 21, 42, 0.5) 100%)",
          }}
        />
        {/* Bottom gold hairline */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent"
        />
      </div>
      {(caption || meta) && (
        <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          {caption && (
            <span className="font-serif text-[15px] text-white/72 leading-snug max-w-xl">{caption}</span>
          )}
          {meta && (
            <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">{meta}</span>
          )}
        </figcaption>
      )}
    </figure>
  );

  return reveal ? <Reveal>{inner}</Reveal> : inner;
}
