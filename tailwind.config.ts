import type { Config } from 'tailwindcss';

const config: Config = {
  safelist: ['tw-dark', 'tw-h-fit', ...[...Array(100).keys()].flatMap(i => [`tw-h-${i}`, `tw-w-${i}`])],
  darkMode: ['selector'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      animation: {
        dash: 'dash 1.5s ease-in-out infinite',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      keyframes: {
        dash: {
          '0%': {
            'stroke-dasharray': '1, 150',
            'stroke-dashoffset': '0',
          },
          '50%': {
            'stroke-dasharray': '90, 150',
            'stroke-dashoffset': '-35',
          },
          '100%': {
            'stroke-dasharray': '90, 150',
            'stroke-dashoffset': '-124',
          },
        },
      },
      transitionProperty: {
        'max-height': 'max-height',
        width: 'width',
      },
    },
  },
  prefix: 'tw-',
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [],
};
export default config;
