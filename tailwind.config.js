/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy colors for compatibility
        "bg-dark": "var(--bg-dark)",
        "bg-mid": "var(--bg-mid)",
        "bg-light": "var(--bg-light)",
        "accent-pink": "var(--accent-pink)",
        "accent-cyan": "var(--accent-cyan)",
        "accent-yellow": "var(--accent-yellow)",
        muted: "var(--muted)",
        glass: "var(--glass)",
        
        // Afro Vibe Color Palette
        ochre: {
          deep: "var(--ochre-deep)",
          light: "var(--ochre-light)",
        },
        terracotta: {
          DEFAULT: "var(--terracotta)",
          light: "var(--terracotta-light)",
        },
        kente: {
          gold: "var(--kente-gold)",
          red: "var(--kente-red)",
          green: "var(--kente-green)",
          blue: "var(--kente-blue)",
        },
        forest: {
          deep: "var(--forest-deep)",
          light: "var(--forest-light)",
        },
        sage: "var(--sage)",
        cream: "var(--cream)",
        sand: "var(--sand)",
        clay: "var(--clay)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Arial Black", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        accent: ["var(--font-accent)", "Roboto", "sans-serif"],
      },
      backgroundImage: {
        "neon-gradient":
          "linear-gradient(135deg, var(--accent-pink), var(--accent-cyan))",
        "button-gradient":
          "linear-gradient(135deg, var(--accent-pink), var(--accent-yellow))",
        "afro-gradient":
          "linear-gradient(135deg, var(--kente-gold), var(--terracotta), var(--kente-red))",
        "earth-gradient":
          "linear-gradient(135deg, var(--ochre-deep), var(--terracotta), var(--clay))",
        "kente-pattern":
          "linear-gradient(90deg, var(--kente-gold) 25%, transparent 25%), linear-gradient(180deg, var(--kente-red) 25%, transparent 25%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        rhythm: "rhythm-pulse 2s ease-in-out infinite",
        "drum-beat": "drum-beat 2s ease-in-out infinite",
        "grass-sway": "grass-sway 4s ease-in-out infinite",
        "fire-flicker": "fire-flicker 1.5s ease-in-out infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
