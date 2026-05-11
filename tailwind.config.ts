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
        playfair: ["Playfair Display", "serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      spacing: {
        "1.25": "0.3125rem",
        "1.75": "0.4375rem",
        "2.5": "0.625rem",
        "3.5": "0.875rem",
        "4.5": "1.125rem",
        "5.5": "1.375rem",
        "7": "1.75rem",
        "13": "3.25rem",
        "15": "3.75rem",
        "18": "4.5rem",
        "20": "5rem",
      },
      colors: {
        stone: {
          50: "#faf9f8",
          100: "#f5f3f1",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#c2410c",
          500: "#a8a29e",
          600: "#78716c",
          700: "#57534e",
          800: "#44403c",
          900: "#1c1917",
        },
        orange: {
          50: "#fdf8f3",
          600: "#ea580c",
          800: "#c2410c",
        },
        green: {
          600: "#16a34a",
        },
        amber: {
          600: "#d97706",
        },
      },
      animation: {
        "fade-down": "fade-down 0.5s ease both",
        "fade-up": "fade-up 0.6s ease both",
        "pulse-dot": "pulse-dot 2s ease infinite",
        "card-in": "card-in 0.55s ease both",
      },
      keyframes: {
        "fade-down": {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.6)", opacity: "0.5" },
        },
        "card-in": {
          from: { opacity: "0", transform: "translateY(20px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      borderWidth: {
        "1.5": "1.5px",
      },
    },
  },
  plugins: [],
};
export default config;
