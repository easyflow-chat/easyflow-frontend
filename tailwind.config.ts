import type { Config } from 'tailwindcss';

const config: Config = {
  safelist: ['tw-dark'],
  darkMode: ['selector'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    fontFamily: {
      rubik: ['rubik', 'sans-serif'],
    },
    colors: {
      'background-dark': '#000000',
      'background-dark-2': '#323232',
      'font-dark': '#FFFAE3',
      'toggle-dark': '#FFFFFF',
      'background-light': '#FFFAE3',
      'font-light': '#000000',
      border: '#5A5A5A'
    }
  },
  prefix: 'tw-',
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [],
};
export default config;
