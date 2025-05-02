import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Geist Sans"', 'sans-serif'],
        mono: ['"Geist Mono"', 'monospace'],
      },
      colors: {
        primary: '#23DDC4',
        secondary: '#0f172a',
        accent: '#ec4899',
      },
      boxShadow: {
        soft: '0 4px 14px 0 rgba(0, 118, 255, 0.39)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, rgba(15,23,42,0.9), rgba(147,51,234,0.6), rgba(236,72,153,0.4))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
  ],
};

export default config;
