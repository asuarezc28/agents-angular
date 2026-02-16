/**
 * Color constants used across the application
 * This is the SINGLE SOURCE OF TRUTH for all color values
 *
 * These values are imported by:
 * - tailwind.config.ts (for Tailwind CSS class generation: bg-*, text-*, etc.)
 * - tailwind-css-variables.mjs (Tailwind plugin that generates CSS variables: --p-*)
 * - theme-colors.service.ts (for programmatic access in TypeScript/ECharts)
 *
 * Workflow:
 * 1. Edit colors here
 * 2. Build/restart dev server (plugin generates CSS variables automatically)
 * 3. All systems updated ✅
 */

export const COLORS = {
  primary: {
    50: '#f0f0ff',
    100: '#e0e0ff',
    200: '#c7c1ff',
    300: '#a89cff',
    400: '#7d6aff',
    500: '#2A01CD', // Konecta Blue - Base color
    600: '#2400ad',
    700: '#1e008e',
    800: '#170072',
    900: '#0F0F72', // Konecta Dark Blue
    950: '#0a0050',
  },
  surface: {
    0: '#ffffff', // Konecta White
    50: '#F2F3F7', // Konecta Light
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#262626', // Konecta Dark
    950: '#0F0F0F', // Konecta Black
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#0E9F6E', // Konecta System Green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#F05252', // Konecta System Red
    600: '#ef4444',
    700: '#dc2626',
    800: '#9B1C1C', // Konecta System Red Dark
    900: '#7f1d1d',
    950: '#450a0a',
  },
  warning: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#F0FA00', // Konecta Yellow
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
    950: '#422006',
  },
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  // Additional shades for borders and UI elements
  gray: {
    300: '#E5E7EB',
    600: '#757575',
    700: '#424242',
    800: '#333333',
    850: '#262626',
    900: '#9e9e9e',
  },
} as const;

// Type-safe color access
export type ColorKey = keyof typeof COLORS;
export type ColorShade<T extends ColorKey> = keyof (typeof COLORS)[T];
