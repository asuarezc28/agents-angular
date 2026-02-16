import type { Config } from 'tailwindcss';
import cssVariablesPlugin from './tailwind-css-variables.mjs';
import { COLORS } from './src/app/core/constants/colors.constants';
import { TYPOGRAPHY } from './src/app/core/constants/typography.constants';

export default {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // All color values imported from single source of truth (colors.constants.ts)
        primary: COLORS.primary,
        surface: COLORS.surface,
        success: COLORS.success,
        danger: COLORS.danger,
        warning: COLORS.warning,
        info: COLORS.info,
        gray: COLORS.gray,

        // Legacy konecta aliases (for backwards compatibility)
        konecta: {
          black: COLORS.surface[950],
          white: COLORS.surface[0],
          blue: COLORS.primary[500],
          blue2: '#A6B7FF', // Lighter variant used in dark mode
          yellow: COLORS.warning[500],
          dark: COLORS.surface[900],
          darkBlue: COLORS.primary[900],
          light: COLORS.surface[50],
          successStory: '#DF622B', // Brand-specific color
        },
      },
      fontFamily: {
        sans: [...TYPOGRAPHY.fontFamily.sans],
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      },
    },
  },
  plugins: [cssVariablesPlugin],
} satisfies Config;
