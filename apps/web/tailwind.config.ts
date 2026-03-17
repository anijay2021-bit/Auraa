import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        cream: {
          DEFAULT: "#FDF8F5",
          50: "#FEFCFB",
          100: "#FDF8F5",
          200: "#FAF0E6",
        },
        violet: {
          DEFAULT: "#7C3AED",
          50: "#F5F0FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#7C3AED",
          600: "#6D28D9",
          700: "#5B21B6",
          800: "#4C1D95",
          900: "#2E1065",
        },
        navy: {
          DEFAULT: "#1A1A2E",
          600: "#2D2D4E",
          700: "#16213E",
          900: "#0F0F23",
        },
        lavender: {
          DEFAULT: "#F3EEFF",
          100: "#F3EEFF",
          200: "#E9DFFE",
        },
        sand: {
          DEFAULT: "#F5E6D3",
          100: "#F5E6D3",
          200: "#EDD4B8",
        },
        gold: {
          DEFAULT: "#D4A96A",
          100: "#FBF4EA",
          200: "#F0D9BA",
          300: "#E4C08A",
          400: "#D4A96A",
          500: "#B88A4A",
          600: "#8F6A33",
        },
        blush: {
          DEFAULT: "#F4B8C1",
          100: "#FDE8EB",
          200: "#F9CDD3",
          300: "#F4B8C1",
        },
      },
      backgroundImage: {
        "auraa-hero":
          "radial-gradient(ellipse at 60% 0%, #EDE9FE 0%, #FDF8F5 55%, #F5E6D3 100%)",
        "auraa-footer":
          "linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)",
        "gold-shimmer":
          "linear-gradient(90deg, #D4A96A 0%, #E4C08A 50%, #D4A96A 100%)",
      },
      boxShadow: {
        "violet-sm": "0 2px 8px rgba(124, 58, 237, 0.18)",
        "violet-md": "0 4px 20px rgba(124, 58, 237, 0.22)",
        "violet-lg": "0 8px 40px rgba(124, 58, 237, 0.28)",
        "gold-sm": "0 2px 8px rgba(212, 169, 106, 0.3)",
        glass: "0 8px 32px rgba(124, 58, 237, 0.1), inset 0 1px 0 rgba(255,255,255,0.6)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
