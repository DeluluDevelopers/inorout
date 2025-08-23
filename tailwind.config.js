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
        "bg-dark": "var(--bg-dark)",
        "bg-mid": "var(--bg-mid)",
        "accent-pink": "var(--accent-pink)",
        "accent-cyan": "var(--accent-cyan)",
        "accent-yellow": "var(--accent-yellow)",
        muted: "var(--muted)",
        glass: "var(--glass)",
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
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
