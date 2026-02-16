import { Injectable, inject, computed } from '@angular/core';
import { ThemeService } from './theme.service';
import { COLORS } from '../constants/colors.constants';

/**
 * Service that provides theme-aware colors for charts and other components.
 * Colors are computed based on the current theme (light/dark) and use values
 * from colors.constants.ts (single source of truth shared with Tailwind)
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeColorsService {
  private themeService = inject(ThemeService);

  /** Text color for labels, titles, and general text */
  readonly textColor = computed(() =>
    this.themeService.isDarkMode() ? COLORS.surface[50] : COLORS.surface[900],
  );

  /** Background color for surfaces (cards, tooltips, etc.) */
  readonly backgroundColor = computed(() =>
    this.themeService.isDarkMode() ? COLORS.surface[950] : COLORS.surface[0],
  );

  /** Secondary background color for hover states */
  readonly backgroundHover = computed(() =>
    this.themeService.isDarkMode() ? COLORS.gray[850] : COLORS.surface[50],
  );

  /** Border color for dividers and outlines */
  readonly borderColor = computed(() =>
    this.themeService.isDarkMode() ? COLORS.gray[700] : COLORS.gray[300],
  );

  /** Subtle border/line color for grid lines */
  readonly borderColorSubtle = computed(() =>
    this.themeService.isDarkMode() ? COLORS.gray[800] : COLORS.surface[50],
  );

  /** Primary brand color (Konecta Blue) */
  readonly primaryColor = COLORS.primary[500];

  /** Success color (Green) */
  readonly successColor = COLORS.success[500];

  /** Danger color (Red) */
  readonly dangerColor = COLORS.danger[500];

  /** Warning color (Yellow) */
  readonly warningColor = COLORS.warning[500];

  /** Info color (Blue) */
  readonly infoColor = COLORS.info[500];

  /**
   * Get CSS variable value from DOM
   * Useful for accessing PrimeNG component-specific variables
   */
  getCSSVariable(variableName: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
  }

  /**
   * Get a color with custom opacity
   * @param color Hex color (e.g., '#2A01CD')
   * @param opacity Opacity from 0 to 1
   */
  withOpacity(color: string, opacity: number): string {
    // Convert hex to rgba
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
}
