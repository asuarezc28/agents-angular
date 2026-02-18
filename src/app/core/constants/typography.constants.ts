export const TYPOGRAPHY = {
  googleFont: {
    name: 'Inter',
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
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
} as const;

const quoteIfNeeded = (fontName: string): string =>
  fontName.includes(' ') && !fontName.startsWith('"') && !fontName.startsWith("'")
    ? `'${fontName}'`
    : fontName;

export const APP_FONT_FAMILY = TYPOGRAPHY.fontFamily.sans.map(quoteIfNeeded).join(', ');
