import { Routes } from '@angular/router';
import { LayoutComponent } from './layout';
import { NotFoundComponent } from './shared/components/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => 
          import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'consulta',
        loadComponent: () => 
          import('./features/consulta/consulta.component').then(m => m.ConsultaComponent)
      },
      {
        path: '404',
        component: NotFoundComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
