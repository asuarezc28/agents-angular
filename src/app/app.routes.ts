import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'analytics/overview',
  },
  {
    path: ':menuId',
    loadComponent: () => import('./features/layout/shell').then((m) => m.ShellComponent),
  },
  {
    path: ':menuId/:panelId',
    loadComponent: () => import('./features/layout/shell').then((m) => m.ShellComponent),
  },
  {
    path: '**',
    redirectTo: 'analytics/overview',
  },
];
