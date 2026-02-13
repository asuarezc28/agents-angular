import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [ButtonModule],
  template: `
    <button
      pButton
      [icon]="themeService.isDarkMode() ? 'pi pi-sun' : 'pi pi-moon'"
      [label]="themeService.isDarkMode() ? 'Claro' : 'Oscuro'"
      (click)="themeService.toggleTheme()"
      [rounded]="true"
      [outlined]="true"
      [attr.aria-label]="
        themeService.isDarkMode() ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
      "
      class="transition-all"
    ></button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);
}
