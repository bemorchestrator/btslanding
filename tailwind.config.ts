import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Gordita', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        'brand-gold': '#F2B33D',
        'off-white': '#F5F5F5',
        'off-black': '#1A1A1A',
      },
      fontSize: {
        'title': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'body': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-bold': ['18px', { lineHeight: '1.6', fontWeight: '700' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};

export default config;
