import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bizora: {
          blue: "#2865F5",
          "blue-hover": "#1d52d4",
          purple: "#5734D9",
          "purple-hover": "#4627b5",
          dark: "#0F172A",
          surface: "#1E293B",
          light: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
