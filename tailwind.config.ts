import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#050B11",
        card: "#07111A",
        border: "#162330",
        primary: "#168CFF",
        green: "#35D07F",
        "text-secondary": "#AAB6C3",
        "text-muted": "#64788B"
      }
    }
  },
  plugins: []
};

export default config;
