import { Instagram, Facebook, LinkedIn } from "./Icons";

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

/**
 * Single source of truth for Kismet's social profiles.
 * Update handles here and they propagate through the footer + contact card.
 */
export const SOCIALS: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/kismetfinancegroup/",
    icon: <Instagram className="w-[18px] h-[18px]" strokeWidth={1.6} />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/kismetfinancegroup",
    icon: <Facebook className="w-[18px] h-[18px]" strokeWidth={1.6} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/kismet-finance-group/",
    icon: <LinkedIn className="w-[18px] h-[18px]" strokeWidth={1.6} />,
  },
];

interface SocialIconRowProps {
  /** Visual variant. "compact" = small icons in a button row, "labelled" = icon + text label per item. */
  variant?: "compact" | "labelled";
  className?: string;
}

export function SocialIconRow({ variant = "compact", className = "" }: SocialIconRowProps) {
  if (variant === "labelled") {
    return (
      <ul className={`space-y-3 ${className}`}>
        {SOCIALS.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-[15px] text-[#c4c6cf]/85 hover:text-[#D4AF37] transition-colors duration-400"
            >
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#43474e]/50 text-[#D4AF37]/85 group-hover:border-[#D4AF37]/60 group-hover:bg-[#1E3A5F]/40 transition-all">
                {s.icon}
              </span>
              <span>{s.label}</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {SOCIALS.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Kismet on ${s.label}`}
            className="group inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#43474e]/50 text-[#D4AF37]/85 hover:text-[#D4AF37] hover:border-[#D4AF37]/60 hover:bg-[#1E3A5F]/40 transition-all duration-400"
          >
            {s.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
