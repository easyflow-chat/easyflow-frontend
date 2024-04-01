import type { Config } from 'tailwindcss';

const config: Config = {
  safelist: ['tw-dark', 'tw-animate-toggle'],
  darkMode: ['selector'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif']
      },
    }
  },
  prefix: 'tw-',
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [],
};
export default config;
