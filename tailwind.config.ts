import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        resolutioTheme: {
          primary: '#5F437F',
          secondary: '#FFCA70',
          accent: '#7F61A0',
          neutral: '#7F61A0',
          'base-100': '#ffffff',
          // Change for future
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
          '.btn-primary': {
            color: '#ffffff',
          },
          '.btn-secondary': {
            color: '#5F437F',
          },
        },
      },
    ],
  },
};
export default config;
