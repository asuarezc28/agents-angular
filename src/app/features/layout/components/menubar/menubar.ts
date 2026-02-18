import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { merge, map, startWith } from 'rxjs';
import { getIcon } from '../../config/icons';
import { MenuConfig } from '../../models/navigation-config';
import { ThemeService } from '../../../../core/services/theme.service';
import { TooltipIconComponent } from '../../../../shared/components/tooltip-icon/tooltip-icon.component';

interface UserMenuItemData {
  kind: 'action' | 'language' | 'theme-toggle';
  action?: UserMenuAction;
  language?: 'es' | 'en';
}

export type UserMenuAction = 'profile' | 'settings' | 'logout';

@Component({
  selector: 'app-menubar',
  imports: [
    NgOptimizedImage,
    TabsModule,
    TieredMenuModule,
    AvatarModule,
    ButtonModule,
    LucideAngularModule,
    TranslateModule,
    TooltipIconComponent,
  ],
  templateUrl: './menubar.html',
  styles: [
    `
      :host {
        display: block;
      }

      :host ::ng-deep .menu-layout {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 0.75rem;
      }

      :host ::ng-deep .menu-tabs .p-tablist-tab-list {
        justify-content: center;
        width: 100%;
        border-width: 0;
      }

      :host ::ng-deep .menu-tabs .p-tab {
        border-width: 0;
      }

      :host ::ng-deep .menu-tabs .p-tablist-active-bar {
        display: none;
      }

      :host ::ng-deep .menu-tabs .p-tab.p-tab-active {
        border-bottom: 2px solid var(--p-primary-color);
      }

      ::ng-deep .user-menu-popup .p-tieredmenu-item-content,
      ::ng-deep .user-menu-popup .p-menu-item-content {
        margin: 0.25rem 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarComponent {
  private readonly translate = inject(TranslateService);
  private readonly themeService = inject(ThemeService);
  private readonly translationChanges = toSignal(
    merge(
      this.translate.onLangChange,
      this.translate.onTranslationChange,
      this.translate.onFallbackLangChange,
    ).pipe(
      startWith(null),
      map(() => Date.now()),
    ),
    { initialValue: Date.now() },
  );

  readonly menus = input.required<MenuConfig[]>();
  readonly activeMenuId = input.required<string>();

  readonly menuSelected = output<MenuConfig>();
  readonly userActionSelected = output<UserMenuAction>();
  protected readonly Sun = Sun;
  protected readonly Moon = Moon;
  protected readonly iconFor = getIcon;

  protected readonly currentLang = signal<'es' | 'en'>(
    (this.translate.getCurrentLang() as 'es' | 'en' | undefined) ??
      (this.translate.getFallbackLang() as 'es' | 'en' | null) ??
      'es',
  );
  protected readonly isDarkMode = computed(() => this.themeService.isDarkMode());
  protected readonly logoSrc = computed(() =>
    this.isDarkMode() ? '/assets/branding/cyra-black.png' : '/assets/branding/cyra-white.png',
  );

  protected readonly userMenuItems = computed<MenuItem[]>(() => {
    this.translationChanges();

    return [
      {
        label: this.translateLabel('layoutBase.userMenu.profile'),
        icon: 'pi pi-user',
        command: () => this.userActionSelected.emit('profile'),
        data: {
          kind: 'action',
          action: 'profile',
        } satisfies UserMenuItemData,
      },
      {
        label: this.translateLabel('layoutBase.userMenu.settings'),
        icon: 'pi pi-cog',
        command: () => this.userActionSelected.emit('settings'),
        data: {
          kind: 'action',
          action: 'settings',
        } satisfies UserMenuItemData,
      },
      {
        label: `${this.translateLabel('layoutBase.userMenu.language.label')} (${this.translateLabel(
          this.currentLang() === 'es' ? 'layoutBase.language.es' : 'layoutBase.language.en',
        )})`,
        icon: 'pi pi-language',
        items: [
          {
            label: this.translateLabel('layoutBase.language.es'),
            icon: this.currentLang() === 'es' ? 'pi pi-check' : undefined,
            command: () => this.changeLang('es'),
            data: {
              kind: 'language',
              language: 'es',
            } satisfies UserMenuItemData,
          },
          {
            label: this.translateLabel('layoutBase.language.en'),
            icon: this.currentLang() === 'en' ? 'pi pi-check' : undefined,
            command: () => this.changeLang('en'),
            data: {
              kind: 'language',
              language: 'en',
            } satisfies UserMenuItemData,
          },
        ],
      },
      {
        label: this.translateLabel('layoutBase.userMenu.theme.label'),
        icon: 'pi pi-palette',
        data: {
          kind: 'theme-toggle',
        } satisfies UserMenuItemData,
      },
      {
        separator: true,
      },
      {
        label: this.translateLabel('layoutBase.userMenu.logout'),
        icon: 'pi pi-sign-out',
        command: () => this.userActionSelected.emit('logout'),
        data: {
          kind: 'action',
          action: 'logout',
        } satisfies UserMenuItemData,
      },
    ];
  });

  protected selectMenu(menu: MenuConfig): void {
    this.menuSelected.emit(menu);
  }

  protected selectMenuById(menuId: string | number | undefined): void {
    if (menuId === undefined) {
      return;
    }

    const menu = this.menus().find((currentMenu) => currentMenu.id === String(menuId));

    if (!menu) {
      return;
    }

    this.selectMenu(menu);
  }

  private changeLang(lang: 'es' | 'en'): void {
    this.translate.use(lang);
    this.currentLang.set(lang);
  }

  protected setThemeMode(isDark: boolean): void {
    if (this.themeService.isDarkMode() === isDark) {
      return;
    }

    this.themeService.toggleTheme();
  }

  private translateLabel(key: string): string {
    return this.translate.instant(key);
  }
}
