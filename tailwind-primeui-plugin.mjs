import plugin from 'tailwindcss/plugin.js';

export default plugin(function ({ addBase, addComponents, theme }) {
  // Base styles
  addBase({
    '*': {
      boxSizing: 'border-box',
    },
    body: {
      margin: '0',
      fontFamily: theme('fontFamily.sans'),
      backgroundColor: theme('colors.white'),
      color: theme('colors.gray.900'),
      transition: 'background-color 0.3s, color 0.3s',
    },
    '.my-app-dark body': {
      backgroundColor: theme('colors.konecta.black'),
      color: theme('colors.konecta.light'),
    },
  });

  // PrimeNG Components usando colores de Tailwind
  addComponents({
    // Button styles
    '.p-button': {
      '@apply rounded-md px-4 py-2 font-medium transition-colors inline-flex items-center justify-center gap-2':
        {},
      backgroundColor: theme('colors.konecta.blue'),
      color: theme('colors.white'),
      border: 'none',
      cursor: 'pointer',
      minHeight: '2.5rem',
      '&:hover:not(:disabled)': {
        backgroundColor: theme('colors.konecta.darkBlue'),
      },
      '&:focus': {
        outline: 'none',
      },
      '&:disabled': {
        opacity: '0.5',
        cursor: 'not-allowed',
      },
    },
    '.p-button-outlined': {
      backgroundColor: 'transparent',
      border: `2px solid ${theme('colors.konecta.blue')}`,
      color: theme('colors.konecta.blue'),
      '&:hover:not(:disabled)': {
        backgroundColor: theme('colors.konecta.blue'),
        color: theme('colors.white'),
      },
    },
    '.my-app-dark .p-button-outlined': {
      borderColor: theme('colors.konecta.blue2'),
      color: theme('colors.konecta.blue2'),
      '&:hover:not(:disabled)': {
        backgroundColor: theme('colors.konecta.blue2'),
        color: theme('colors.konecta.black'),
      },
    },
    '.p-button-text': {
      backgroundColor: 'transparent',
      border: 'none',
      color: theme('colors.konecta.blue'),
      '&:hover:not(:disabled)': {
        backgroundColor: theme('colors.gray.100'),
      },
    },
    '.my-app-dark .p-button-text': {
      color: theme('colors.konecta.blue2'),
      '&:hover:not(:disabled)': {
        backgroundColor: theme('colors.konecta.dark'),
      },
    },
    '.p-button-sm': {
      '@apply px-3 py-1.5 text-sm': {},
    },
    '.p-button-lg': {
      '@apply px-6 py-3 text-lg': {},
    },

    // Card styles
    '.p-card': {
      '@apply rounded-lg shadow-md overflow-hidden': {},
      backgroundColor: theme('colors.white'),
      border: `1px solid ${theme('colors.gray.200')}`,
    },
    '.my-app-dark .p-card': {
      backgroundColor: theme('colors.konecta.dark'),
      borderColor: theme('colors.gray.700'),
    },
    '.p-card-header': {
      borderBottom: `1px solid ${theme('colors.gray.200')}`,
      padding: '1.5rem',
      backgroundColor: theme('colors.konecta.light'),
    },
    '.my-app-dark .p-card-header': {
      borderBottomColor: theme('colors.gray.700'),
      backgroundColor: theme('colors.konecta.black'),
    },
    '.p-card-body': {
      padding: '1.5rem',
    },
    '.p-card-footer': {
      borderTop: `1px solid ${theme('colors.gray.200')}`,
      padding: '1.5rem',
    },
    '.my-app-dark .p-card-footer': {
      borderTopColor: theme('colors.gray.700'),
    },

    // Input styles
    '.p-inputtext': {
      '@apply rounded-md border px-3 py-2 transition-colors w-full': {},
      borderColor: theme('colors.gray.300'),
      backgroundColor: theme('colors.white'),
      color: theme('colors.gray.900'),
      '&:focus': {
        '@apply ring-2 ring-offset-2 outline-none': {},
        ringColor: theme('colors.konecta.blue'),
        borderColor: theme('colors.konecta.blue'),
      },
      '&:disabled': {
        opacity: '0.5',
        cursor: 'not-allowed',
        backgroundColor: theme('colors.gray.100'),
      },
    },
    '.my-app-dark .p-inputtext': {
      backgroundColor: theme('colors.konecta.dark'),
      borderColor: theme('colors.gray.600'),
      color: theme('colors.konecta.light'),
      '&:focus': {
        borderColor: theme('colors.konecta.blue2'),
        ringColor: theme('colors.konecta.blue2'),
      },
    },

    // Component base
    '.p-component': {
      fontFamily: theme('fontFamily.sans'),
    },
  });
});
