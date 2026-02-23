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
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { MenuConfig, PanelConfig } from './models/navigation-config';
import { NavigationService } from './services/navigation.service';
import { MenubarComponent } from './components/menubar/menubar';
import { UserMenuAction } from './components/menubar/menubar';
import { SidebarComponent } from './components/sidebar/sidebar';
import { ContentComponent } from './components/content/content';
import { ContextSelectorComponent } from './components/context-selector/context-selector.component';
import { TooltipIconComponent } from '../../shared/components/tooltip-icon/tooltip-icon.component';
import { AppMessageService } from '../../core/services/app-message.service';

@Component({
  selector: 'app-shell',
  imports: [
    TranslateModule,
    MenubarComponent,
    SidebarComponent,
    ContentComponent,
    ContextSelectorComponent,
    TooltipIconComponent,
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
          <app-context-selector />
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

          <button
            type="button"
            class="sidebar-toggle"
            [class.sidebar-toggle--attached]="isSidebarVisible()"
            [class.sidebar-toggle--detached]="!isSidebarVisible()"
            [attr.aria-label]="
              isSidebarVisible()
                ? ('layoutBase.sidebar.hide' | translate)
                : ('layoutBase.sidebar.show' | translate)
            "
            [attr.aria-expanded]="isSidebarVisible()"
            aria-controls="app-sidebar-panel"
            (click)="toggleSidebar()"
          >
            <app-tooltip-icon
              [icon]="isSidebarVisible() ? ChevronLeft : ChevronRight"
              [size]="18"
              class="block lg:hidden"
              [tooltip]="
                isSidebarVisible()
                  ? ('layoutBase.sidebar.hide' | translate)
                  : ('layoutBase.sidebar.show' | translate)
              "
              [ariaLabel]="
                isSidebarVisible()
                  ? ('layoutBase.sidebar.hide' | translate)
                  : ('layoutBase.sidebar.show' | translate)
              "
            />

            <app-tooltip-icon
              [icon]="isSidebarVisible() ? ChevronUp : ChevronDown"
              [size]="18"
              class="hidden lg:block"
              [tooltip]="
                isSidebarVisible()
                  ? ('layoutBase.sidebar.hide' | translate)
                  : ('layoutBase.sidebar.show' | translate)
              "
              [ariaLabel]="
                isSidebarVisible()
                  ? ('layoutBase.sidebar.hide' | translate)
                  : ('layoutBase.sidebar.show' | translate)
              "
            />
          </button>
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

      .sidebar-panel {
        order: 1;
        width: auto;
        flex: 1 1 auto;
        max-width: 100%;
        max-height: 120px;
        overflow: hidden;
        opacity: 1;
        visibility: visible;
        transition:
          max-width 300ms ease-in-out,
          max-height 300ms ease-in-out,
          opacity 220ms ease-in-out,
          visibility 0s linear;
        will-change: max-width, max-height, opacity;
        contain: layout paint;
      }

      .sidebar-panel-content {
        opacity: 1;
        visibility: visible;
        transition:
          opacity 90ms ease-out,
          visibility 0s linear;
      }

      .sidebar-panel--hidden {
        max-width: 0;
        max-height: 120px;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition:
          max-width 300ms ease-in-out,
          max-height 300ms ease-in-out,
          opacity 110ms ease-out,
          visibility 0s linear 120ms;
      }

      .sidebar-panel--hidden .sidebar-panel-content {
        opacity: 0;
        visibility: hidden;
        transition:
          opacity 70ms ease-out,
          visibility 0s linear 80ms;
      }

      .sidebar-toggle {
        order: 0;
        position: relative;
        z-index: 2;
        display: flex;
        height: 2.5rem;
        width: 2.75rem;
        min-width: 2.75rem;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border: 1px solid
          var(--p-card-border-color, var(--p-content-border-color, var(--p-surface-300)));
        background-color: var(--p-content-background, var(--p-surface-0));
        color: var(--p-text-color, var(--p-surface-700));
        transition:
          background-color 200ms ease-in-out,
          border-color 200ms ease-in-out,
          color 200ms ease-in-out,
          box-shadow 200ms ease-in-out;
      }

      .sidebar-toggle::before {
        content: '';
        position: absolute;
        top: 0;
        left: 1px;
        right: 1px;
        height: 1px;
        background-color: var(--p-content-background, var(--p-surface-0));
        pointer-events: none;
        opacity: 0;
        transition: opacity 200ms ease-in-out;
      }

      .sidebar-toggle::after {
        content: '';
        position: absolute;
        top: 1px;
        right: -1px;
        bottom: 1px;
        width: 2px;
        background-color: var(--p-content-background, var(--p-surface-0));
        pointer-events: none;
        opacity: 0;
        transition: opacity 200ms ease-in-out;
      }

      .sidebar-toggle--attached {
        margin-right: -1px;
        border: 1px solid
          var(--p-card-border-color, var(--p-content-border-color, var(--p-surface-300)));
        border-right: 0;
        border-radius: var(--p-border-radius, 0.5rem) 0 0 var(--p-border-radius, 0.5rem);
      }

      .sidebar-toggle--attached::before {
        opacity: 0;
      }

      .sidebar-toggle--attached::after {
        opacity: 1;
      }

      .sidebar-toggle--detached {
        border-radius: var(--p-border-radius, 0.5rem);
        margin-right: 0.5rem;
      }

      .sidebar-toggle:hover {
        color: var(--p-primary-color, var(--p-primary-500));
      }

      .sidebar-toggle:active {
        color: var(--p-primary-color, var(--p-primary-500));
      }

      .sidebar-toggle:focus {
        outline: none;
      }

      .sidebar-toggle:focus-visible {
        border-color: var(--p-primary-color, var(--p-primary-500));
        box-shadow: 0 0 0 2px
          color-mix(in srgb, var(--p-primary-color, var(--p-primary-500)) 22%, transparent);
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

        .sidebar-toggle {
          order: 0;
          width: 3rem;
          min-width: 3rem;
        }

        .sidebar-toggle--attached {
          margin-right: 0;
          margin-top: 0;
          margin-bottom: -1px;
          border: 1px solid
            var(--p-card-border-color, var(--p-content-border-color, var(--p-surface-300)));
          border-bottom: 0;
          border-radius: var(--p-border-radius, 0.5rem) var(--p-border-radius, 0.5rem) 0 0;
        }

        .sidebar-toggle--attached::before {
          top: auto;
          bottom: 0;
          opacity: 1;
        }

        .sidebar-toggle--attached::after {
          opacity: 0;
        }

        .sidebar-toggle--detached {
          margin-right: 0;
          margin-top: 0;
          margin-bottom: 0.5rem;
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
  protected readonly ChevronLeft = ChevronLeft;
  protected readonly ChevronRight = ChevronRight;
  protected readonly ChevronUp = ChevronUp;
  protected readonly ChevronDown = ChevronDown;

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
