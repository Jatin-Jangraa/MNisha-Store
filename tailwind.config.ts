import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(0 0% 100%)"
        },
        luxury: {
          gold: "#B8860B",
          "gold-light": "#D4A843",
          "gold-lighter": "#F0D68A",
          "gold-dark": "#8B6508",
          ink: "#0a0a0a",
          porcelain: "#F8F8F8",
          pearl: "#FFFFFF",
          line: "#EAEAEA"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        display: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"]
      },
      fontSize: {
        "display": ["4rem", { lineHeight: "1.08", letterSpacing: "-0.025em", fontWeight: "400" }],
        "display-lg": ["5.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "400" }],
        "display-xl": ["7rem", { lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "400" }]
      },
      boxShadow: {
        glow: "0 24px 80px rgba(184, 134, 11, 0.15)",
        "glow-lg": "0 32px 100px rgba(184, 134, 11, 0.22)",
        "glow-sm": "0 8px 32px rgba(184, 134, 11, 0.1)",
        editorial: "0 22px 80px rgba(0, 0, 0, 0.08)",
        "editorial-lg": "0 32px 100px rgba(0, 0, 0, 0.12)",
        "editorial-xl": "0 48px 120px rgba(0, 0, 0, 0.16)",
        soft: "0 2px 16px rgba(0, 0, 0, 0.03)",
        "soft-lg": "0 8px 40px rgba(0, 0, 0, 0.05)",
        premium: "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.04)",
        "dark-soft": "0 2px 16px rgba(0, 0, 0, 0.3)",
        "dark-editorial": "0 22px 80px rgba(0, 0, 0, 0.4)"
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem"
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        float: "float 10s ease-in-out infinite",
        pulseGold: "pulse-gold 3s ease-in-out infinite",
        "fade-in": "fade-in 0.8s ease-out forwards",
        "slide-up": "slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "spin-slow": "spin 4s linear infinite",
        "bounce-gentle": "bounce-gentle 2.5s ease-in-out infinite",
        "spin-slower": "spin 8s linear infinite"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" }
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -20px, 0)" }
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 rgba(184, 134, 11, 0)" },
          "50%": { boxShadow: "0 0 60px rgba(184, 134, 11, 0.3)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem"
      },
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.16, 1, 0.3, 1)",
        "smooth": "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: [animate]
};

export default config;
