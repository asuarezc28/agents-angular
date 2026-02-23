import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { MenuConfig, PanelConfig } from './models/navigation-config';
import { NavigationService } from './services/navigation.service';
import { MenubarComponent } from './components/menubar/menubar';
import { UserMenuAction } from './components/menubar/menubar';
import { SidebarComponent } from './components/sidebar/sidebar';
import { ContentComponent } from './components/content/content';
import { CompanyProjectSelectorComponent } from '../../shared/components/company-project-selector/company-project-selector.component';
import { TooltipIconComponent } from '../../shared/components/tooltip-icon/tooltip-icon.component';
import { AppMessageService } from '../../core/services/app-message.service';

@Component({
  selector: 'app-shell',
  imports: [
    TranslateModule,
    MenubarComponent,
    SidebarComponent,
    ContentComponent,
    CompanyProjectSelectorComponent,
  ],
  template: `
    <div class="min-h-screen p-4 md:p-6">
      <div class="mb-6 flex flex-col items-center">
        <header class="relative z-10 w-full">
          <app-menubar
            [menus]="menus()"
            [activeMenuId]="activeMenu().id"
            (menuSelected)="selectMenu($event)"
            (userActionSelected)="handleUserAction($event)"
          />
        </header>

        <div class="w-full">
          <company-project-selector />
        </div>

        <div class="mt-3 flex w-full flex-wrap items-center gap-2">
          <button type="button" class="message-test-btn" (click)="showTestError()">
            Probar error
          </button>
          <button type="button" class="message-test-btn" (click)="showTestWarning()">
            Probar warning
          </button>
          <button type="button" class="message-test-btn" (click)="showTestSuccess()">
            Probar success
          </button>
        </div>
      </div>

      <section [class]="contentLayoutClass()">
        <div class="sidebar-rail">
          <div
            id="app-sidebar-panel"
            class="sidebar-panel"
            [class.sidebar-panel--hidden]="!isSidebarVisible()"
          >
            <div class="sidebar-panel-content">
              <app-sidebar
                [panels]="sidebarPanels()"
                [activePanelId]="activePanel()?.id ?? ''"
                (panelSelected)="selectPanel($event)"
              />
            </div>
          </div>
        </div>

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

      .layout-shell {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        align-items: start;
      }

      .sidebar-rail {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        justify-self: start;
        gap: 0;
        overflow: visible;
      }

      .message-test-btn {
        border: 1px solid
          var(--p-card-border-color, var(--p-content-border-color, var(--p-surface-300)));
        border-radius: var(--p-border-radius, 0.5rem);
        background-color: var(--p-content-background, var(--p-surface-0));
        color: var(--p-text-color, var(--p-surface-700));
        padding: 0.45rem 0.75rem;
        font-size: 0.875rem;
        line-height: 1.1;
        transition:
          color 180ms ease-in-out,
          border-color 180ms ease-in-out,
          box-shadow 180ms ease-in-out;
      }

      .message-test-btn:hover {
        color: var(--p-primary-color, var(--p-primary-500));
      }

      .message-test-btn:focus {
        outline: none;
      }

      .message-test-btn:focus-visible {
        border-color: var(--p-primary-color, var(--p-primary-500));
        box-shadow: 0 0 0 2px
          color-mix(in srgb, var(--p-primary-color, var(--p-primary-500)) 22%, transparent);
      }

      @media (min-width: 1024px) {
        .layout-shell {
          grid-template-columns: var(--sidebar-column-width, 72px) minmax(0, 1fr);
        }

        .sidebar-rail {
          flex-direction: column;
          align-items: center;
          width: var(--sidebar-column-width, 72px);
          transition: width 300ms ease-in-out;
        }

        .sidebar-panel {
          order: 1;
          width: 72px;
          flex: 0 0 auto;
          max-width: 72px;
          max-height: 420px;
          visibility: visible;
        }

        .sidebar-panel--hidden {
          max-width: 72px;
          max-height: 0;
          visibility: hidden;
        }

        .layout-shell--expanded {
          --sidebar-column-width: 72px;
        }

        .layout-shell--collapsed {
          --sidebar-column-width: 48px;
        }

        .sidebar-rail {
          align-self: start;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly navigation = inject(NavigationService);
  private readonly appMessageService = inject(AppMessageService);
  protected readonly isSidebarVisible = signal(true);

  readonly menus = this.navigation.menus;

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

  protected readonly contentLayoutClass = computed(() =>
    this.isSidebarVisible()
      ? 'layout-shell layout-shell--expanded'
      : 'layout-shell layout-shell--collapsed',
  );

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

  protected handleUserAction(action: UserMenuAction): void {
    if (action === 'logout') {
      return;
    }

    if (action === 'profile') {
      return;
    }

    if (action === 'settings') {
      return;
    }
  }

  protected toggleSidebar(): void {
    this.isSidebarVisible.update((visible) => !visible);
  }

  protected showTestError(): void {
    this.appMessageService.showError('No se pudo cargar la información solicitada.', {
      title: 'Error de prueba',
      detail: 'Este mensaje es solo para validar cómo se ve el modal global de error.',
    });
  }

  protected showTestWarning(): void {
    this.appMessageService.showWarning('Hay datos pendientes de sincronizar.', {
      title: 'Warning de prueba',
      detail: 'Este mensaje es solo para validar cómo se ve el modal global de warning.',
    });
  }

  protected showTestSuccess(): void {
    this.appMessageService.showSuccess('Cambios guardados correctamente.', {
      title: 'Success de prueba',
      detail: 'Este toast es solo para validar feedback no bloqueante en operaciones exitosas.',
    });
  }

  private navigateTo(menuId: string, panelId: string): void {
    this.router.navigate(['/', menuId, panelId]);
  }
}
