import { Injectable, signal } from '@angular/core';
import { MenuConfig, PanelConfig } from '../models/navigation-config';
import { NAVIGATION_CONFIG } from '../config/navigation.config';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  readonly menus = signal<MenuConfig[]>(NAVIGATION_CONFIG);

  getDefaultMenu(): MenuConfig {
    return this.menus()[0];
  }

  getMenuById(menuId: string | null | undefined): MenuConfig | undefined {
    if (!menuId) {
      return undefined;
    }

    return this.menus().find((menu) => menu.id === menuId);
  }

  getDefaultPanel(menuId: string | null | undefined): PanelConfig | undefined {
    return this.getMenuById(menuId)?.panels[0];
  }

  getPanelById(menuId: string | null | undefined, panelId: string | null | undefined) {
    if (!panelId) {
      return undefined;
    }

    return this.getMenuById(menuId)?.panels.find((panel) => panel.id === panelId);
  }
}
