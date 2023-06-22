const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.link': {
          color: theme('colors.fuchsia.600'),
          textDecoration: 'underline',
        },
        '.link:hover': {
          color: theme('colors.fuchsia.500'),
        },
        '.link:focus': {
          color: theme('colors.fuchsia.700'),
        },
        '.btn': {
          backgroundColor: theme('colors.fuchsia.600'),
          color: theme('colors.white'),
          padding: `${theme('spacing.2')} ${theme('spacing.6')}`,
          borderRadius: theme('borderRadius.md'),
        },
        '.btn:hover': {
          backgroundColor: theme('colors.fuchsia.500'),
        },
        '.btn:focus': {
          backgroundColor: theme('colors.fuchsia.700'),
        },
        '.form-control': {
          width: theme('width.full'),
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          borderRadius: theme('borderRadius.md'),
          borderWidth: theme('width.px'),
        },
      });
    }),
  ],
};
