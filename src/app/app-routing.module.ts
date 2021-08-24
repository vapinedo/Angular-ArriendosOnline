import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth']);

import { BackendLayoutComponent } from '@feature/backend/backend-layout.component';
import { FrontendLayoutComponent } from '@feature/frontend/frontend-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@feature/backend/auth/auth.module')
    .then(m => m.AuthModule)
  },
  { 
    path: 'home', // frontend
    component: FrontendLayoutComponent,
    loadChildren: () => import('@feature/frontend/property/frontend-property.module')
    .then(m => m.FrontendPropertyModule)
  },
  {  
    path: 'admin', // backend
    component:  BackendLayoutComponent,
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {  
        path: '',
        loadChildren: () => import('@feature/backend/property/backend-property.module')
        .then(m => m.BackendPropertyModule)
      },
      {  
        path: 'dashboard',
        loadChildren: () => import('@feature/backend/dashboard/dashboard.module')
        .then(m => m.DashboardModule)
      },
      {  
        path: 'propietarios',
        loadChildren: () => import('@feature/backend/owner/owner.module')
        .then(m => m.OwnerModule)
      },      
      {  
        path: 'barrios',
        loadChildren: () => import('@feature/backend/neighborhood/neighborhood.module')
        .then(m => m.NeighborhoodModule)
      }      
    ]
  },
  { path: '', redirectTo: '/home',  pathMatch: 'full' },
  { path: '***', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
