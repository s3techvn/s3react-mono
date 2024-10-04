import type { Config } from "tailwindcss";

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  presets: [require('@s3react/core/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
  prefix: "s3react-"
}

export default config;
