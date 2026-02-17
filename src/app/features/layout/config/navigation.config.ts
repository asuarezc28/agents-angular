import { MenuConfig } from '../models/navigation-config';
import { OverviewDashboardComponent } from '../components/overview-dashboard/overview-dashboard.component';
import { KpisDashboardComponent } from '../components/kpis-dashboard/kpis-dashboard.component';
import { TreeDemoComponent } from '../../../shared/components/tree-demo/tree-demo.component';

export const NAVIGATION_CONFIG: MenuConfig[] = [
  {
    id: 'analytics',
    icon: 'chart',
    titleKey: 'workspace.menu.analytics',
    panels: [
      {
        id: 'overview',
        icon: 'home',
        titleKey: 'workspace.panel.analytics.overview.title',
        descriptionKey: 'workspace.panel.analytics.overview.description',
        component: OverviewDashboardComponent,
      },
      {
        id: 'kpis',
        icon: 'activity',
        titleKey: 'workspace.panel.analytics.kpis.title',
        descriptionKey: 'workspace.panel.analytics.kpis.description',
        component: KpisDashboardComponent,
      },
    ],
  },
  {
    id: 'operations',
    icon: 'folder',
    titleKey: 'workspace.menu.operations',
    panels: [
      {
        id: 'projects',
        icon: 'file',
        titleKey: 'workspace.panel.operations.projects.title',
        descriptionKey: 'workspace.panel.operations.projects.description',
        component: TreeDemoComponent,
      },
      {
        id: 'security',
        icon: 'shield',
        titleKey: 'workspace.panel.operations.security.title',
        descriptionKey: 'workspace.panel.operations.security.description',
      },
    ],
  },
  {
    id: 'users',
    icon: 'users',
    titleKey: 'workspace.menu.users',
    panels: [
      {
        id: 'directory',
        icon: 'users',
        titleKey: 'workspace.panel.users.directory.title',
        descriptionKey: 'workspace.panel.users.directory.description',
      },
      {
        id: 'roles',
        icon: 'settings',
        titleKey: 'workspace.panel.users.roles.title',
        descriptionKey: 'workspace.panel.users.roles.description',
      },
    ],
  },
];
