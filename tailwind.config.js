/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        canvas: "#0B1220",
        panel: "#17243B",
        accent: {
          cyan: "#22D3EE",
          blue: "#3B82F6",
          purple: "#A78BFA",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "glow-cyan": "0 0 36px rgba(34, 211, 238, 0.22)",
        "glow-blue": "0 18px 60px rgba(59, 130, 246, 0.16)",
        "glow-purple": "0 0 50px rgba(167, 139, 250, 0.15)",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(110deg, #22D3EE 0%, #3B82F6 55%, #A78BFA 100%)",
        "hero-scrim": "linear-gradient(90deg, rgba(15, 23, 42, 0.98) 0%, rgba(15, 23, 42, 0.90) 39%, rgba(15, 23, 42, 0.46) 76%, rgba(15, 23, 42, 0.28) 100%)",
        "glow-cyan": "radial-gradient(ellipse at center, rgba(34, 211, 238, 0.11), transparent 68%)",
        "glow-purple": "radial-gradient(ellipse at center, rgba(167, 139, 250, 0.10), transparent 68%)",
        "project-fallback": "linear-gradient(135deg, #17243B 0%, #0F172A 55%, #23365D 100%)",
      },
    },
  },
  plugins: [],
};