import { Type } from '@angular/core';

export type NavIconKey =
  | 'home'
  | 'chart'
  | 'users'
  | 'settings'
  | 'folder'
  | 'shield'
  | 'file'
  | 'activity';

export interface PanelConfig {
  id: string;
  icon: NavIconKey;
  titleKey: string;
  descriptionKey: string;
  component?: Type<unknown>; // Componente a renderizar en el content
  loadComponent?: () => Promise<Type<unknown>>;
}

export interface MenuConfig {
  id: string;
  icon: NavIconKey;
  iconSize?: number;
  titleKey: string;
  panels: PanelConfig[];
}
