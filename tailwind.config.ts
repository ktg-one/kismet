import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        // Brand authoritative (Shane's brand guide)
        navy: { DEFAULT: "#1E3A5F", deep: "#0F2440" },
        gold: { DEFAULT: "#D4AF37", light: "#FFE884", mid: "#FADD63", deep: "#A47308" },
        cream: "#FAF8F4",
        neutral: "#D3D3D3",

        // Stitch surface hierarchy - tonal layering for atmospheric depth
        background: "#0a141e",
        surface: "#0a141e",
        "surface-dim": "#0a141e",
        "surface-bright": "#303a46",
        "surface-container-lowest": "#050f19",
        "surface-container-low": "#131c27",
        "surface-container": "#17202b",
        "surface-container-high": "#212b36",
        "surface-container-highest": "#2c3641",
        "surface-variant": "#2c3641",

        // On-surface text tones
        "on-surface": "#d9e3f2",
        "on-surface-variant": "#c4c6cf",
        "on-background": "#d9e3f2",

        // Outlines / dividers
        outline: "#8e9199",
        "outline-variant": "#43474e",

        // Brand-anchored container colors (primary-container uses your brand navy)
        "primary-container": "#1E3A5F",
        "on-primary-container": "#8aa4cf",

        // Accent blue (use sparingly, gold remains primary action)
        primary: "#adc8f5",
        "on-primary": "#133155",
      },
      fontFamily: {
        serif: ["var(--font-newsreader)", "Georgia", "Berlingske Serif", "serif"],
        sans: ["var(--font-montserrat)", "Montserrat", "Arial", "sans-serif"],
        // Stitch-aligned semantic aliases — all display roles use Newsreader
        "display-xl": ["var(--font-newsreader)", "Georgia", "Berlingske Serif", "serif"],
        "headline-lg": ["var(--font-newsreader)", "Georgia", "Berlingske Serif", "serif"],
        "headline-md": ["var(--font-newsreader)", "Georgia", "Berlingske Serif", "serif"],
        "body-lg": ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        "body-md": ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        "label-sm": ["var(--font-montserrat)", "Montserrat", "sans-serif"],
      },
      fontSize: {
        // Stitch typography scale
        "display-xl": ["64px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg": ["48px", { lineHeight: "1.2", fontWeight: "600" }],
        "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", letterSpacing: "0.01em", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-sm": ["12px", { lineHeight: "1", letterSpacing: "0.1em", fontWeight: "600" }],
      },
      spacing: {
        unit: "8px",
        "margin-page": "64px",
        gutter: "24px",
        "section-gap": "120px",
        "container-max": "1280px",
      },
      maxWidth: {
        "container-max": "1280px",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(180deg, #FFD956 0%, #A47308 35%, #FADD63 65%, #FFE884 100%)",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        sm: "0.125rem",
        md: "0.375rem",
        lg: "0.25rem",
        xl: "0.5rem",
        "2xl": "0.75rem",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
