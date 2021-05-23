import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '@feature/layout.component';

const routes: Routes = [
  {  
    path: 'dashboard',
    component:  LayoutComponent,
    children: [
      {  
        path: '',
        loadChildren: () => import('@feature/dashboard/dashboard.module')
        .then(m => m.DashboardModule)
      }
    ]
  },
  { path: '', redirectTo: '/dashboard',  pathMatch: 'full' },
  { path: '***', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
