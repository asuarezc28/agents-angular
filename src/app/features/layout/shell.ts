import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MenuConfig, PanelConfig } from './models/navigation-config';
import { NavigationService } from './services/navigation.service';
import { MenubarComponent } from './components/menubar/menubar';
import { UserMenuAction } from './components/menubar/menubar';
import { SidebarComponent } from './components/sidebar/sidebar';
import { ContentComponent } from './components/content/content';

@Component({
  selector: 'app-shell',
  imports: [TranslateModule, MenubarComponent, SidebarComponent, ContentComponent],
  template: `
    <div class="min-h-screen p-4 md:p-6">
      <header class="mb-6">
        <h1 class="text-2xl font-semibold">{{ 'layoutBase.title' | translate }}</h1>

        <app-menubar
          [menus]="menus()"
          [activeMenuId]="activeMenu().id"
          (menuSelected)="selectMenu($event)"
          (userActionSelected)="handleUserAction($event)"
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

  private navigateTo(menuId: string, panelId: string): void {
    this.router.navigate(['/', menuId, panelId]);
  }
}
