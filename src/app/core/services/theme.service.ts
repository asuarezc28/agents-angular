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
      // Añadir clase para prevenir transiciones durante el toggle inicial
      const html = document.documentElement;

      // Deshabilitar transiciones temporalmente para evitar flickering
      html.classList.add('theme-transitioning');

      // Cambiar el tema
      html.classList.toggle('dark', isDark);

      // Aplicar color-scheme para mejorar renderizado del navegador
      html.style.colorScheme = isDark ? 'dark' : 'light';

      localStorage.setItem('theme', isDark ? 'dark' : 'light');

      // Forzar reflow para que los estilos se apliquen sincronizadamente
      void html.offsetHeight;

      // Re-habilitar transiciones después de que el tema se haya aplicado
      setTimeout(() => {
        html.classList.remove('theme-transitioning');
      }, 50);
    }
  }
}
