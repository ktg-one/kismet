import { Facebook, Instagram } from "./Icons";
import type { ReactNode } from "react";

export interface SocialLink {
  label: string;
  href: string;
  icon: ReactNode;
}

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
];
