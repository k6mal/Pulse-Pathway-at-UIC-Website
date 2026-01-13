import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Futura", "Jost", "Century Gothic", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        forest: {
          DEFAULT: "hsl(var(--forest))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "ekg-exit": {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(-32px)" },
        },
        "content-reveal": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-logo": {
          "0%, 100%": {
            opacity: "0.85",
            transform: "scale(1)"
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.08)"
          },
        },
        "ekg-draw": {
          "0%": {
            strokeDashoffset: "2000",
            opacity: "0"
          },
          "2%": {
            opacity: "1"
          },
          "40%": {
            strokeDashoffset: "0",
            opacity: "1"
          },
          "50%, 100%": {
            strokeDashoffset: "0",
            opacity: "1"
          }
        },
        "ekg-sweep": {
          "0%": {
            transform: "translateX(-1200px)"
          },
          "100%": {
            transform: "translateX(1000px)"
          }
        },
        "line-wipe": {
          "0%": {
            transform: "translateY(0)",
            opacity: "0"
          },
          "5%": {
            opacity: "0.8"
          },
          "95%": {
            opacity: "0.8"
          },
          "100%": {
            transform: "translateY(100vh)",
            opacity: "0"
          }
        },
        "draw-mask": {
          "0%": {
            opacity: "1"
          },
          "40%": {
            opacity: "1"
          },
          "45%": {
            opacity: "0"
          },
          "100%": {
            opacity: "0"
          }
        },
        "slide-out-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(50%)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)"
          }
        },
        "slide-out-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(-50%)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)"
          }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "ekg-exit": "ekg-exit 0.6s ease-in forwards",
        "content-reveal": "content-reveal 0.8s ease-out forwards",
        "pulse-logo": "pulse-logo 2s ease-in-out infinite",
        "ekg-draw": "ekg-draw 2s linear infinite",
        "ekg-sweep": "ekg-sweep 2s linear infinite",
        "draw-mask": "draw-mask 2s linear infinite",
        "line-wipe": "line-wipe 0.8s ease-in-out 2s forwards",
        "slide-out-left": "slide-out-left 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "slide-out-right": "slide-out-right 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
