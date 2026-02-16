import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { SelectModule } from 'primeng/select';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { MenuConfig, PanelConfig } from './models/navigation-config';
import { NavigationService } from './services/navigation.service';
import { MenubarComponent } from './components/menubar/menubar';
import { SidebarComponent } from './components/sidebar/sidebar';
import { ContentComponent } from './components/content/content';

interface LanguageOption {
  value: string;
  labelKey: string;
}

@Component({
  selector: 'app-shell',
  imports: [
    FormsModule,
    TranslateModule,
    SelectModule,
    ThemeToggleComponent,
    MenubarComponent,
    SidebarComponent,
    ContentComponent,
  ],
  template: `
    <div class="min-h-screen p-4 md:p-6">
      <header class="mb-6">
        <div class="flex items-center justify-between gap-4 flex-wrap">
          <h1 class="text-2xl font-semibold">{{ 'workspace.title' | translate }}</h1>

          <div
            class="flex items-center gap-2"
            [attr.aria-label]="'workspace.language.ariaLabel' | translate"
          >
            <p-select
              [options]="languageOptions"
              [ngModel]="currentLang()"
              optionValue="value"
              (ngModelChange)="changeLang($event)"
              [attr.aria-label]="'workspace.language.ariaLabel' | translate"
              styleClass="min-w-[110px]"
            >
              <ng-template pTemplate="selectedItem" let-selected>
                @if (selected) {
                  <span>{{ selected.labelKey | translate }}</span>
                }
              </ng-template>

              <ng-template pTemplate="item" let-option>
                <span>{{ option.labelKey | translate }}</span>
              </ng-template>
            </p-select>

            <app-theme-toggle />
          </div>
        </div>

        <app-menubar
          [menus]="menus()"
          [activeMenuId]="activeMenu().id"
          (menuSelected)="selectMenu($event)"
        />
      </header>

      <section class="grid grid-cols-1 lg:grid-cols-[88px_1fr] gap-4">
        <app-sidebar
          [panels]="sidebarPanels()"
          [activePanelId]="activePanel()?.id ?? ''"
          (panelSelected)="selectPanel($event)"
        />

        <main>
          <app-content [panel]="activePanel()" />
        </main>
      </section>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly navigation = inject(NavigationService);
  private readonly translate = inject(TranslateService);

  readonly menus = this.navigation.menus;
  protected readonly currentLang = signal(
    this.translate.currentLang || this.translate.getDefaultLang() || 'es',
  );
  protected readonly languageOptions: LanguageOption[] = [
    { value: 'es', labelKey: 'workspace.language.es' },
    { value: 'en', labelKey: 'workspace.language.en' },
  ];

  private readonly menuId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('menuId'))),
    { initialValue: this.route.snapshot.paramMap.get('menuId') },
  );

  private readonly panelId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('panelId'))),
    { initialValue: this.route.snapshot.paramMap.get('panelId') },
  );

  readonly activeMenu = computed(() => {
    return this.navigation.getMenuById(this.menuId()) ?? this.navigation.getDefaultMenu();
  });

  readonly sidebarPanels = computed(() => this.activeMenu().panels);

  readonly activePanel = computed(() => {
    const panel = this.navigation.getPanelById(this.activeMenu().id, this.panelId());
    return panel ?? this.navigation.getDefaultPanel(this.activeMenu().id);
  });

  constructor() {
    effect(() => {
      const activeMenu = this.activeMenu();
      const currentMenuId = this.menuId();
      const currentPanelId = this.panelId();
      const currentPanel = this.navigation.getPanelById(activeMenu.id, currentPanelId);

      if (currentMenuId !== activeMenu.id || !currentPanel) {
        this.navigateTo(activeMenu.id, activeMenu.panels[0].id);
      }
    });
  }

  protected selectMenu(menu: MenuConfig): void {
    this.navigateTo(menu.id, menu.panels[0].id);
  }

  protected selectPanel(panel: PanelConfig): void {
    this.navigateTo(this.activeMenu().id, panel.id);
  }

  protected changeLang(lang: string): void {
    this.translate.use(lang);
    this.currentLang.set(lang);
  }

  private navigateTo(menuId: string, panelId: string): void {
    this.router.navigate(['/', menuId, panelId]);
  }
}
