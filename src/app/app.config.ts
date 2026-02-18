import {
  APP_INITIALIZER,
  ApplicationConfig,
  DOCUMENT,
  PLATFORM_ID,
  inject,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { APP_FONT_FAMILY, TYPOGRAPHY } from './core/constants/typography.constants';

const initializeTypography = (): (() => void) => {
  const document = inject(DOCUMENT);
  const platformId = inject(PLATFORM_ID);

  return () => {
    if (!isPlatformBrowser(platformId)) {
      return;
    }

    const existingFontLink = document.querySelector<HTMLLinkElement>(
      'link[data-app-google-font="primary"]',
    );

    if (!existingFontLink) {
      const preconnectFonts = document.createElement('link');
      preconnectFonts.rel = 'preconnect';
      preconnectFonts.href = 'https://fonts.googleapis.com';
      document.head.appendChild(preconnectFonts);

      const preconnectStatic = document.createElement('link');
      preconnectStatic.rel = 'preconnect';
      preconnectStatic.href = 'https://fonts.gstatic.com';
      preconnectStatic.crossOrigin = 'anonymous';
      document.head.appendChild(preconnectStatic);

      const fontStylesheet = document.createElement('link');
      fontStylesheet.rel = 'stylesheet';
      fontStylesheet.href = TYPOGRAPHY.googleFont.url;
      fontStylesheet.setAttribute('data-app-google-font', 'primary');
      document.head.appendChild(fontStylesheet);
    }

    document.documentElement.style.setProperty('--app-font-family', APP_FONT_FAMILY);
    document.documentElement.style.setProperty('--p-font-family', APP_FONT_FAMILY);
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeTypography,
    },
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
        },
      },
      ripple: false,
      // Configuración para usar Lucide en lugar de PrimeIcons
      // Los iconos se manejan mediante templates personalizados en cada componente
    }),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '/common.json',
      }),
      defaultLanguage: 'es',
      useDefaultLang: true,
    }),
  ],
};
