import { MenuConfig } from '../models/navigation-config';

export const NAVIGATION_CONFIG: MenuConfig[] = [
  {
    id: 'analytics',
    icon: 'chart',
    titleKey: '',
    iconSize: 30,
    panels: [
      {
        id: 'overview',
        icon: 'newspaper',
        titleKey: 'layoutBase.panel.analytics.overview.title',
        descriptionKey: 'layoutBase.panel.analytics.overview.description',
        loadComponent: () =>
          import('../../analytics-overview/overview-dashboard.component').then(
            (module) => module.OverviewDashboardComponent,
          ),
      },
      {
        id: 'settings',
        icon: 'settings',
        titleKey: 'layoutBase.panel.analytics.settings.title',
        descriptionKey: 'layoutBase.panel.analytics.settings.description',
        loadComponent: () =>
          import('../../settings/components/settings-dashboard/settings-dashboard.component').then(
            (module) => module.SettingsDashboardComponent,
          ),
      },
    ],
  },
  {
    id: 'operations',
    icon: 'folder',
    iconSize: 30,
    titleKey: '',
    panels: [
      {
        id: 'projects',
        icon: 'file',
        titleKey: 'layoutBase.panel.operations.projects.title',
        descriptionKey: 'layoutBase.panel.operations.projects.description',
        loadComponent: () =>
          import('../../../shared/components/tree-demo/tree-demo.component').then(
            (module) => module.TreeDemoComponent,
          ),
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
    iconSize: 30,
    titleKey: '',
    panels: [
      {
        id: 'directory',
        icon: 'users',
        titleKey: 'layoutBase.panel.users.directory.title',
        descriptionKey: 'layoutBase.panel.users.directory.description',
        loadComponent: () =>
          import('../components/plain-panel-view/plain-panel-view.component').then(
            (module) => module.PlainPanelViewComponent,
          ),
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
