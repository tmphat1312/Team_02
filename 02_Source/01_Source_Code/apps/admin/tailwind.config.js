const { heroui, colors } = require('@heroui/react');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#ba8a01',
              foreground: '#ffffff',
            },
          },
        },
      },
      layout: {
        radius: {
          small: '0.125rem',
          medium: '0.25rem',
          large: '0.5rem',
        },
      },
    }),
  ],
};
