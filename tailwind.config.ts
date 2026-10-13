import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem",
        "4xl": "6rem",
        "5xl": "8rem",
      },
      // Typography system (approved Figma): [size, line height].
      fontSize: {
        display: ["4rem", { lineHeight: "4.5rem" }], // 64 / 72
        h1: ["3rem", { lineHeight: "3.5rem" }], // 48 / 56
        h2: ["2.5rem", { lineHeight: "3rem" }], // 40 / 48
        h3: ["2rem", { lineHeight: "2.5rem" }], // 32 / 40
        h4: ["1.5rem", { lineHeight: "1.875rem" }], // 24 / 30
        "body-lg": ["1.25rem", { lineHeight: "1.875rem" }], // 20 / 30
        body: ["1rem", { lineHeight: "1.625rem" }], // 16 / 26
        "body-sm": ["0.875rem", { lineHeight: "1.375rem" }], // 14 / 22
        caption: ["0.75rem", { lineHeight: "1.125rem" }], // 12 / 18
        overline: ["0.75rem", { lineHeight: "1rem" }], // 12 / 16
        nav: ["1rem", { lineHeight: "1.5rem" }], // 16 / 24
        button: ["1rem", { lineHeight: "1.5rem" }], // 16 / 24
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        highlight: "hsl(var(--highlight))",
        navy: "hsl(var(--navy))",
        danger: "hsl(var(--danger))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          foreground: "hsl(var(--surface-foreground))",
        },
        ink: {
          DEFAULT: "hsl(var(--ink))",
          foreground: "hsl(var(--ink-foreground))",
          card: "hsl(var(--ink-card))",
          border: "hsl(var(--ink-border))",
          muted: "hsl(var(--ink-muted))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)",
        dropdown: "0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)",
        modal: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        header: "0 1px 0 0 hsl(var(--border)), 0 4px 16px -8px rgba(0, 0, 0, 0.12)",
        banner: "0 32px 48px -24px rgba(0, 0, 0, 0.45)",
      },
      borderRadius: {
        card: "var(--radius-card, 1rem)",
        button: "var(--radius-button, 0.5rem)",
        input: "var(--radius-input, 0.375rem)",
        DEFAULT: "var(--radius, 0.5rem)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Steady one-way pans for the About hero slideshow. The fixed 1.08 scale gives
        // enough overflow that the 3% shift never reveals an edge.
        "pan-right": {
          from: { transform: "scale(1.08) translate3d(-3%, 0, 0)" },
          to: { transform: "scale(1.08) translate3d(3%, 0, 0)" },
        },
        "pan-left": {
          from: { transform: "scale(1.08) translate3d(3%, 0, 0)" },
          to: { transform: "scale(1.08) translate3d(-3%, 0, 0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(2rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 60s linear infinite",
        "spin-slow": "spin 12s linear infinite",
        "pan-right": "pan-right 9s linear both",
        "pan-left": "pan-left 9s linear both",
        "fade-up": "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
