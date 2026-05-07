import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#1E3A5F", deep: "#0F2440" },
        gold: { DEFAULT: "#D4AF37", light: "#FFE884", mid: "#FADD63", deep: "#A47308" },
        cream: "#FAF8F4",
        neutral: "#D3D3D3",
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
        sans: ["Montserrat", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(180deg, #FFD956 0%, #A47308 35%, #FADD63 65%, #FFE884 100%)",
      },
    },
  },
} satisfies Config;
