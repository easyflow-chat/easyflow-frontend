import type { Config } from 'tailwindcss';

const config: Config = {
  safelist: ['tw-dark', 'tw-h-fit'],
  darkMode: ['selector'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      animation: {
        dash: 'dash 1.5s ease-in-out infinite',
        'modal-open': 'modal-open 0.5s ease-in-out',
      },
      colors: {
        'ewc-black': 'var(--ewc-black)',
        'ewc-rich-black': 'var(--ewc-rich-black)',
        'ewc-oxford-blue': 'var(--ewc-oxford-blue)',
        'ewc-charcoal': 'var(--ewc-charcoal)',
        'ewc-lavender-tint-1': 'var(--ewc-lavender-tint-1)',
        'ewc-lavender-tint-2': 'var(--ewc-lavender-tint-2)',
        'ewc-lavender-tint-3': 'var(--ewc-lavender-tint-3)',
        'ewc-pale-purple': 'var(--ewc-pale-purple)',
        'ewc-rose-quartz': 'var(--ewc-rose-quartz)',
        'ewc-mountbatten-pink': 'var(--ewc-mountbatten-pink)',
        'ewc-gray': 'var(--ewc-gray)',
      },
      screens: {
        '3xl': '1800px',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      keyframes: {
        'modal-open': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
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
        height: 'height',
      },
    },
  },
  prefix: 'tw-',
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [],
};
export default config;
