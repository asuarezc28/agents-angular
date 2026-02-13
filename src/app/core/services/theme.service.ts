import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);

  readonly isDarkMode = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Cargar preferencia guardada o usar preferencia del sistema
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      this.isDarkMode.set(savedTheme === 'dark' || (!savedTheme && prefersDark));

      // Aplicar tema inicial
      effect(() => {
        this.applyTheme(this.isDarkMode());
      });
    }
  }

  toggleTheme(): void {
    this.isDarkMode.update((v) => !v);
  }

  private applyTheme(isDark: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.classList.toggle('my-app-dark', isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }
}
