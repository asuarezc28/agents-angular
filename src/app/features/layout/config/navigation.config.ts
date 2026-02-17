import { MenuConfig } from '../models/navigation-config';

export const NAVIGATION_CONFIG: MenuConfig[] = [
  {
    id: 'analytics',
    icon: 'chart',
    titleKey: 'layoutBase.menu.analytics',
    panels: [
      {
        id: 'overview',
        icon: 'home',
        titleKey: 'layoutBase.panel.analytics.overview.title',
        descriptionKey: 'layoutBase.panel.analytics.overview.description',
      },
      {
        id: 'kpis',
        icon: 'activity',
        titleKey: 'layoutBase.panel.analytics.kpis.title',
        descriptionKey: 'layoutBase.panel.analytics.kpis.description',
      },
    ],
  },
  {
    id: 'operations',
    icon: 'folder',
    titleKey: 'layoutBase.menu.operations',
    panels: [
      {
        id: 'projects',
        icon: 'file',
        titleKey: 'layoutBase.panel.operations.projects.title',
        descriptionKey: 'layoutBase.panel.operations.projects.description',
      },
      {
        id: 'security',
        icon: 'shield',
        titleKey: 'layoutBase.panel.operations.security.title',
        descriptionKey: 'layoutBase.panel.operations.security.description',
      },
    ],
  },
  {
    id: 'users',
    icon: 'users',
    titleKey: 'layoutBase.menu.users',
    panels: [
      {
        id: 'directory',
        icon: 'users',
        titleKey: 'layoutBase.panel.users.directory.title',
        descriptionKey: 'layoutBase.panel.users.directory.description',
      },
      {
        id: 'roles',
        icon: 'settings',
        titleKey: 'layoutBase.panel.users.roles.title',
        descriptionKey: 'layoutBase.panel.users.roles.description',
      },
    ],
  },
];
