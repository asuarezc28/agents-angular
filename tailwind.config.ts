import type { Config } from 'tailwindcss';
import primeUIPlugin from './tailwind-primeui-plugin.mjs';

export default {
  content: ['./src/**/*.{html,ts}'],
  darkMode: ['class', 'my-app-dark'],
  theme: {
    extend: {
      colors: {
        // Colores base Konecta
        konecta: {
          black: '#0F0F0F',
          white: '#FFFFFF',
          blue: '#2A01CD',
          blue2: '#A6B7FF',
          yellow: '#F0FA00',
          dark: '#262626',
          darkBlue: '#0F0F72',
          light: '#F2F3F7',
          gray: '#F2F3F7',
          successStory: '#DF622B',
        },
        // Colores del sistema
        system: {
          red: {
            500: '#F05252',
            800: '#9B1C1C',
          },
          green: {
            500: '#0E9F6E',
          },
        },
        // Laravel red (adicional)
        laravel: '#FF2D20',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [primeUIPlugin],
} satisfies Config;
