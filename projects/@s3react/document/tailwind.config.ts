import type { Config } from "tailwindcss";

const config: Config = {
  presets: [require("../../../packages/@s3react/core/src/preset")],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
