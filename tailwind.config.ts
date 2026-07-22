import type { Config } from "tailwindcss";

/**
 * Expert Safety Solutions — design tokens.
 *
 * The default Tailwind color palette is intentionally NOT used. Every color a
 * component reaches for maps to a named brand token below, so the whole site
 * can be re-skinned by editing this one file when the real brand hex/logo land.
 *
 * Placeholder brand values (swap when the real palette arrives):
 *   signal  #D62410  primary fire-red      ember  #F26722  safety-orange
 *   ink     #111722  navy-charcoal base    steel  #3F4A5A  graphite neutral
 *   paper   #F6F7F9  cool off-white bg     hiviz  #FFC400  interactive amber
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}", "./content/**/*.mdx"],
  theme: {
    // Replace the palette entirely rather than extend it — no stray defaults.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      black: "#000000",

      // Primary fire-red signal color.
      signal: {
        DEFAULT: "#D62410",
        50: "#FDECEA",
        100: "#FAD3CE",
        200: "#F3A79C",
        300: "#EC7A6A",
        400: "#E24C38",
        500: "#D62410",
        600: "#B31C0B",
        700: "#8C1608",
        800: "#651006",
        900: "#3F0A03",
      },

      // Secondary safety-orange / ember.
      ember: {
        DEFAULT: "#F26722",
        100: "#FDE3D3",
        300: "#F8A877",
        500: "#F26722",
        700: "#C24C12",
      },

      // Structural navy-charcoal.
      ink: {
        DEFAULT: "#111722",
        50: "#F2F4F7",
        100: "#E3E7ED",
        200: "#C6CDD9",
        300: "#9AA5B6",
        400: "#5F6C80",
        500: "#3A465A",
        600: "#273040",
        700: "#1B2230",
        800: "#141A26",
        900: "#111722",
      },

      // Graphite neutral (borders, muted text on light).
      steel: {
        DEFAULT: "#3F4A5A",
        light: "#5A6678",
        dark: "#2A3340",
      },

      // Cool off-white background family (deliberately NOT warm cream).
      paper: {
        DEFAULT: "#F6F7F9",
        50: "#FBFCFD",
        100: "#F6F7F9",
        200: "#EDEFF3",
        300: "#E1E5EB",
        400: "#CDD3DC",
      },

      // Sharp interactive accent — focus rings, active states. Used sparingly.
      hiviz: {
        DEFAULT: "#FFC400",
        soft: "#FFDA5C",
      },

      // Semantic compliance-status colors (gauge green zone, alerts).
      status: {
        ok: "#1F9D55",
        okSoft: "#D6F0E0",
        warn: "#E7A200",
        danger: "#D62410",
      },
    },

    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(17,23,34,0.04), 0 8px 24px rgba(17,23,34,0.06)",
        "card-hover": "0 2px 4px rgba(17,23,34,0.06), 0 16px 40px rgba(17,23,34,0.10)",
        ring: "0 0 0 3px rgba(255,196,0,0.5)",
      },
      maxWidth: {
        content: "76rem",
      },
      keyframes: {
        "gauge-sweep": {
          "0%": { transform: "rotate(-52deg)" },
          "60%": { transform: "rotate(38deg)" },
          "100%": { transform: "rotate(30deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "gauge-sweep": "gauge-sweep 1.4s cubic-bezier(0.22,1,0.36,1) forwards",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
