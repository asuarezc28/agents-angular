import plugin from 'tailwindcss/plugin.js';

/**
 * Tailwind CSS Plugin: Generate CSS Variables (--p-*) for PrimeNG
 *
 * This plugin reads colors from tailwind.config.ts via theme('colors')
 * (which imports from colors.constants.ts - single source of truth)
 * and generates CSS variables for both light and dark modes.
 *
 * Generated variables are used by PrimeNG components and custom styles.
 *
 * Execution: Automatic during Tailwind build (registered in tailwind.config.ts)
 */
export default plugin(function ({ addBase, theme }) {
  // Get colors from Tailwind config (which imports from colors.constants.ts)
  const colors = theme('colors');

  // Generar variables para :root (light mode)
  const rootVars = {
    // Primary colors
    '--p-primary-50': colors.primary[50],
    '--p-primary-100': colors.primary[100],
    '--p-primary-200': colors.primary[200],
    '--p-primary-300': colors.primary[300],
    '--p-primary-400': colors.primary[400],
    '--p-primary-500': colors.primary[500],
    '--p-primary-600': colors.primary[600],
    '--p-primary-700': colors.primary[700],
    '--p-primary-800': colors.primary[800],
    '--p-primary-900': colors.primary[900],
    '--p-primary-950': colors.primary[950],
    '--p-primary-contrast': colors.surface[0],

    // Surface colors
    '--p-surface-0': colors.surface[0],
    '--p-surface-50': colors.surface[50],
    '--p-surface-100': colors.surface[100],
    '--p-surface-200': colors.surface[200],
    '--p-surface-300': colors.surface[300],
    '--p-surface-400': colors.surface[400],
    '--p-surface-500': colors.surface[500],
    '--p-surface-600': colors.surface[600],
    '--p-surface-700': colors.surface[700],
    '--p-surface-800': colors.surface[800],
    '--p-surface-900': colors.surface[900],
    '--p-surface-950': colors.surface[950],

    // Text colors
    '--p-text-color': colors.surface[900],
    '--p-text-hover-color': colors.surface[950],
    '--p-text-muted-color': colors.surface[600],
    '--p-text-hover-muted-color': colors.surface[700],

    // Semantic colors
    '--p-success-50': colors.success[50],
    '--p-success-500': colors.success[500],
    '--p-success-900': colors.success[900],

    '--p-danger-50': colors.danger[50],
    '--p-danger-500': colors.danger[500],
    '--p-danger-900': colors.danger[900],

    '--p-warning-50': colors.warning[50],
    '--p-warning-500': colors.warning[500],
    '--p-warning-900': colors.warning[900],

    '--p-info-50': colors.info[50],
    '--p-info-500': colors.info[500],
    '--p-info-900': colors.info[900],

    // Focus
    '--p-focus-ring-color': colors.primary[500],
    '--p-focus-ring-width': '2px',

    // Content/Component backgrounds
    '--p-content-background': colors.surface[0],
    '--p-content-hover-background': colors.surface[50],
    '--p-content-color': colors.surface[900],
    '--p-content-border-color': colors.surface[300],
    '--p-content-border-radius': '0.5rem',

    // Button component
    '--p-button-primary-background': colors.primary[500],
    '--p-button-primary-hover-background': colors.primary[600],
    '--p-button-primary-active-background': colors.primary[700],
    '--p-button-primary-border-color': colors.primary[500],
    '--p-button-primary-hover-border-color': colors.primary[600],
    '--p-button-primary-color': colors.surface[0],
    '--p-button-primary-hover-color': colors.surface[0],

    // Card component
    '--p-card-background': colors.surface[0],
    '--p-card-border-color': colors.surface[300],
    '--p-card-color': colors.surface[900],
    '--p-card-shadow':
      '0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)',

    // Input component
    '--p-inputtext-background': colors.surface[0],
    '--p-inputtext-border-color': colors.surface[400],
    '--p-inputtext-hover-border-color': colors.primary[500],
    '--p-inputtext-focus-border-color': colors.primary[500],
    '--p-inputtext-color': colors.surface[900],

    // Tree component
    '--p-tree-background': 'transparent',
    '--p-tree-color': colors.surface[900],
    '--p-tree-border-color': colors.surface[300],
    '--p-tree-node-hover-background': colors.surface[50],
    '--p-tree-node-selected-background': colors.primary[50],
    '--p-tree-node-color': colors.surface[900],
    '--p-tree-node-hover-color': colors.surface[950],
    '--p-tree-node-selected-color': colors.primary[800],
    '--p-tree-node-icon-color': colors.surface[600],
    '--p-tree-node-icon-hover-color': colors.surface[700],
  };

  // Generar variables para .dark (dark mode)
  const darkVars = {
    // Primary - lighter for dark mode
    '--p-primary-500': '#A6B7FF',
    '--p-primary-contrast': colors.surface[950],

    // Surface inverted
    '--p-surface-0': colors.surface[950],
    '--p-surface-50': colors.surface[900],
    '--p-surface-100': colors.surface[800],
    '--p-surface-200': colors.surface[700],
    '--p-surface-300': colors.surface[600],
    '--p-surface-400': colors.surface[500],
    '--p-surface-500': colors.surface[400],
    '--p-surface-600': colors.surface[300],
    '--p-surface-700': colors.surface[200],
    '--p-surface-800': colors.surface[100],
    '--p-surface-900': colors.surface[50],
    '--p-surface-950': colors.surface[0],

    // Text colors - lighter for better readability
    '--p-text-color': colors.surface[50],
    '--p-text-hover-color': colors.surface[0],
    '--p-text-muted-color': colors.surface[300],
    '--p-text-hover-muted-color': colors.surface[200],

    // Focus
    '--p-focus-ring-color': '#A6B7FF',

    // Content/Component backgrounds (darker for cards, panels)
    '--p-content-background': colors.surface[900],
    '--p-content-hover-background': colors.surface[800],
    '--p-content-color': colors.surface[50],
    '--p-content-border-color': colors.surface[700],

    // Button component (dark mode)
    '--p-button-primary-background': colors.primary[500],
    '--p-button-primary-hover-background': colors.primary[400],
    '--p-button-primary-active-background': colors.primary[300],
    '--p-button-primary-border-color': colors.primary[500],
    '--p-button-primary-hover-border-color': colors.primary[400],
    '--p-button-primary-color': colors.surface[950],
    '--p-button-primary-hover-color': colors.surface[950],

    // Card component (dark mode)
    '--p-card-background': colors.surface[900],
    '--p-card-border-color': colors.surface[800],
    '--p-card-color': colors.surface[50],
    '--p-card-shadow':
      '0 2px 1px -1px rgba(0, 0, 0, 0.4), 0 1px 1px 0 rgba(0, 0, 0, 0.28), 0 1px 3px 0 rgba(0, 0, 0, 0.24)',

    // Input component (dark mode)
    '--p-inputtext-background': colors.surface[900],
    '--p-inputtext-border-color': colors.surface[800],
    '--p-inputtext-hover-border-color': '#A6B7FF',
    '--p-inputtext-focus-border-color': '#A6B7FF',
    '--p-inputtext-color': colors.surface[50],

    // Tree component (dark mode)
    '--p-tree-background': 'none',
    '--p-tree-color': colors.surface[50],
    '--p-tree-border-color': colors.surface[800],
    '--p-tree-node-hover-background': colors.surface[800],
    '--p-tree-node-selected-background': 'rgba(166, 183, 255, 0.2)',
    '--p-tree-node-color': colors.surface[50],
    '--p-tree-node-hover-color': colors.surface[0],
    '--p-tree-node-selected-color': '#A6B7FF',
    '--p-tree-node-icon-color': colors.surface[500],
    '--p-tree-node-icon-hover-color': colors.surface[400],
  };

  addBase({
    ':root': rootVars,
    ':root.dark': darkVars,
    '.dark .p-component': {
      'color-scheme': 'dark',
    },
  });
});
