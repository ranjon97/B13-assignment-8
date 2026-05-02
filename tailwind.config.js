/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        // Dark theme palette inspired by Linear/Stripe
        bg: {
          primary: "#0a0a0f",
          secondary: "#0f0f17",
          tertiary: "#15151f",
          elevated: "#1a1a26",
        },
        accent: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d4fe",
          300: "#a5b6fc",
          400: "#8090f7",
          500: "#6366f1",
          600: "#5046e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        glow: {
          purple: "#a855f7",
          blue: "#3b82f6",
          cyan: "#06b6d4",
          pink: "#ec4899",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-gradient":
          "radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.15) 0px, transparent 50%), radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 0.08) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 0.1) 0px, transparent 50%), radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 0.18) 0px, transparent 50%), radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 0.05) 0px, transparent 50%), radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 0.06) 0px, transparent 50%), radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 0.08) 0px, transparent 50%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(99, 102, 241, 0.4)",
        "glow-lg": "0 0 60px rgba(168, 85, 247, 0.5)",
        "glow-cyan": "0 0 40px rgba(6, 182, 212, 0.4)",
        "inner-glow": "inset 0 0 20px rgba(99, 102, 241, 0.15)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "gradient-x": "gradient-x 8s ease infinite",
        shimmer: "shimmer 2s linear infinite",
        float: "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        shimmer: {
          "0%": { "background-position": "-1000px 0" },
          "100%": { "background-position": "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", "box-shadow": "0 0 20px rgba(99, 102, 241, 0.4)" },
          "50%": { opacity: "0.8", "box-shadow": "0 0 40px rgba(168, 85, 247, 0.7)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#6366f1",
          secondary: "#a855f7",
          accent: "#06b6d4",
          neutral: "#1a1a26",
          "base-100": "#0a0a0f",
          "base-200": "#0f0f17",
          "base-300": "#15151f",
          info: "#3b82f6",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
    ],
    darkTheme: "dark",
  },
};
