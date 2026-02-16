import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '../../../core/services/theme.service';
import { LucideAngularModule, Sun, Moon } from 'lucide-angular';

@Component({
  selector: 'app-theme-toggle',
  imports: [ButtonModule, LucideAngularModule],
  template: `
    <button
      pButton
      (click)="themeService.toggleTheme()"
      [rounded]="true"
      [outlined]="true"
      [attr.aria-label]="
        themeService.isDarkMode() ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
      "
      class="transition-all flex items-center gap-2"
    >
      <lucide-icon [img]="themeService.isDarkMode() ? Sun : Moon" [size]="16" />
      <span>{{ themeService.isDarkMode() ? 'Claro' : 'Oscuro' }}</span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);
  protected readonly Sun = Sun;
  protected readonly Moon = Moon;
}
