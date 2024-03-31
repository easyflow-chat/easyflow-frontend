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
        rubik: ['rubik', 'sans-serif'],
      },
      colors: {
        'background-dark': '#000000',
        'background-dark-2': '#323232',
        'font-dark': '#FFFAE3',
        'toggle-dark': '#FFFFFF',
        'background-light': '#FFFAE3',
        'background-light-2': '#EEEAE3',
        'font-light': '#000000',
        'toggle-light': '#323232',
        border: '#5A5A5A'
      },
      keyframes: {
        toggle: {
          '0%, 100%': {transform: 'translate(26px)'},
        },
        'rotate-45': {
          '0%, 100%': {transform: 'rotate(45deg) translate(0, 16px)'},
        },
        'rotate-neg-45': {
          '0%, 100%': {transform: 'rotate(-45deg) translate(0, -16px)'},
        },
      },
      animation: {
        toggle: 'toggle 1s ease-in-out infinite',
        'rotate-45': 'rotate-45 1s ease-in-out infinite',
        'rotate-neg-45': 'rotate-neg-45 1s ease-in-out infinite reverse'
      },
      transitionProperty: {
        height: 'tw-height',
        width: 'tw-width'
      }
    }
  },
  prefix: 'tw-',
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [],
};
export default config;
