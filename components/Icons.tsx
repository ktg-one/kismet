/**
 * Inline SVG icon library. No external font dependency.
 * Sized to inherit currentColor; default sized to 20x20 unless overridden via className.
 */

interface IconProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

function Icon({
  children,
  className = "w-5 h-5",
  size,
  strokeWidth = 1.5,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (props: IconProps) => (
  <Icon {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </Icon>
);

export const Compass = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </Icon>
);

export const Hub = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="3" />
    <circle cx="4" cy="6" r="2" />
    <circle cx="20" cy="6" r="2" />
    <circle cx="4" cy="18" r="2" />
    <circle cx="20" cy="18" r="2" />
    <line x1="6" y1="6" x2="10" y2="11" />
    <line x1="18" y1="6" x2="14" y2="11" />
    <line x1="6" y1="18" x2="10" y2="13" />
    <line x1="18" y1="18" x2="14" y2="13" />
  </Icon>
);

export const Compass2 = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
    <polyline points="9 13 12 8 15 13 12 11 9 13" fill="currentColor" />
  </Icon>
);

export const Building = (props: IconProps) => (
  <Icon {...props}>
    <rect x="4" y="2" width="16" height="20" rx="1" />
    <line x1="9" y1="22" x2="9" y2="18" />
    <line x1="15" y1="22" x2="15" y2="18" />
    <line x1="8" y1="6" x2="10" y2="6" />
    <line x1="14" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="10" y2="10" />
    <line x1="14" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="10" y2="14" />
    <line x1="14" y1="14" x2="16" y2="14" />
  </Icon>
);

export const ColumnsIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 21h18" />
    <path d="M5 21V8l7-5 7 5v13" />
    <line x1="9" y1="9" x2="9" y2="21" />
    <line x1="15" y1="9" x2="15" y2="21" />
  </Icon>
);

export const Clock = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </Icon>
);

export const Architecture = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 21h18" />
    <path d="M6 18V8l6-5 6 5v10" />
    <path d="M9 21v-6h6v6" />
    <line x1="9" y1="11" x2="15" y2="11" />
  </Icon>
);

export const Forum = (props: IconProps) => (
  <Icon {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Icon>
);

export const Eye = (props: IconProps) => (
  <Icon {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

export const Sail = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 16h18l-2 4H5l-2-4z" />
    <path d="M11 16V3l9 13H11z" />
    <path d="M11 16L4 16l5-9 2 9z" />
  </Icon>
);

export const Network = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="2" />
    <circle cx="5" cy="5" r="2" />
    <circle cx="19" cy="5" r="2" />
    <circle cx="5" cy="19" r="2" />
    <circle cx="19" cy="19" r="2" />
    <line x1="6.5" y1="6.5" x2="10.5" y2="10.5" />
    <line x1="17.5" y1="6.5" x2="13.5" y2="10.5" />
    <line x1="6.5" y1="17.5" x2="10.5" y2="13.5" />
    <line x1="17.5" y1="17.5" x2="13.5" y2="13.5" />
  </Icon>
);

export const Quote = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
  </Icon>
);

/* Social icons - filled style for legibility at small sizes */

export const Instagram = (props: IconProps) => (
  <Icon {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </Icon>
);

export const Facebook = (props: IconProps) => (
  <Icon {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </Icon>
);

export const LinkedIn = (props: IconProps) => (
  <Icon {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </Icon>
);
