import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base (paper theme)
        bg: "#F7F2E8",
        surface: "#FFFFFF",
        surfaceMuted: "#FBF8F2",
        text: "#161616",
        textMuted: "#6F6A60",
        border: "#E9E1D3",
        divider: "#EFE8DD",
        
        // Accent
        accent: "#1F1F1F",
        accentSoft: "#F0E9DE",
        
        // States
        success: "#1F8A4C",
        warning: "#B7791F",
        danger: "#C2413A",
      },
      borderRadius: {
        card: "24px",
        row: "18px",
        pill: "999px",
        input: "16px",
      },
      boxShadow: {
        e1: "0 1px 2px rgba(0, 0, 0, 0.04)",
        e2: "0 6px 18px rgba(0, 0, 0, 0.06)",
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        container: "1200px",
      },
      transitionDuration: {
        smooth: "150ms",
      },
    },
  },
  plugins: [],
};

export default config;
