import { MenuConfig } from '../models/navigation-config';
import { OverviewDashboardComponent } from '../components/overview-dashboard/overview-dashboard.component';
import { KpisDashboardComponent } from '../components/kpis-dashboard/kpis-dashboard.component';
import { TreeDemoComponent } from '../../../shared/components/tree-demo/tree-demo.component';
import { PlainPanelViewComponent } from '../components/plain-panel-view/plain-panel-view.component';

export const NAVIGATION_CONFIG: MenuConfig[] = [
  {
    id: 'analytics',
    icon: 'chart',
    titleKey: '',
    iconSize: 40,
    panels: [
      {
        id: 'overview',
        icon: 'home',
        titleKey: 'layoutBase.panel.analytics.overview.title',
        descriptionKey: 'layoutBase.panel.analytics.overview.description',
        component: OverviewDashboardComponent,
      },
      {
        id: 'kpis',
        icon: 'activity',
        titleKey: 'layoutBase.panel.analytics.kpis.title',
        descriptionKey: 'layoutBase.panel.analytics.kpis.description',
        component: KpisDashboardComponent,
      },
    ],
  },
  {
    id: 'operations',
    icon: 'folder',
    iconSize: 40,
    titleKey: '',
    panels: [
      {
        id: 'projects',
        icon: 'file',
        titleKey: 'layoutBase.panel.operations.projects.title',
        descriptionKey: 'layoutBase.panel.operations.projects.description',
        component: TreeDemoComponent,
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
    iconSize: 40,
    titleKey: '',
    panels: [
      {
        id: 'directory',
        icon: 'users',
        titleKey: 'layoutBase.panel.users.directory.title',
        descriptionKey: 'layoutBase.panel.users.directory.description',
        component: PlainPanelViewComponent,
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
