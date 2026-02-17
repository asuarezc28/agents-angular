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
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { merge, map, startWith } from 'rxjs';
import { getIcon } from '../../config/icons';
import { MenuConfig, NavIconKey } from '../../models/navigation-config';
import { ThemeService } from '../../../../core/services/theme.service';

interface MenubarItemData {
  menu: MenuConfig;
  icon: NavIconKey;
  iconSize: number;
}

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
    MenubarModule,
    TieredMenuModule,
    AvatarModule,
    ButtonModule,
    LucideAngularModule,
    TranslateModule,
  ],
  templateUrl: './menubar.html',
  styles: [
    `
      :host {
        display: block;
      }

      :host ::ng-deep .p-menubar {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
      }

      :host ::ng-deep .p-menubar-root-list {
        width: 100%;
        justify-content: center;
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

  protected readonly items = computed<MenuItem[]>(() =>
    this.menus().map((menu) => ({
      id: menu.id,
      label: menu.titleKey,
      styleClass: this.isActive(menu.id) ? 'font-semibold' : undefined,
      data: {
        menu,
        icon: menu.icon,
        iconSize: menu.iconSize ?? 16,
      } satisfies MenubarItemData,
    })),
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

  protected isActive(menuId: string): boolean {
    return this.activeMenuId() === menuId;
  }

  protected selectMenuFromItem(item: MenuItem): void {
    const data = item['data'] as MenubarItemData | undefined;

    if (!data) {
      return;
    }

    this.selectMenu(data.menu);
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
