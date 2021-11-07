import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth']);

import { HomeLayoutComponent } from '@feature/home/home-layout.component';
import { AdminLayoutComponent } from '@feature/admin/admin-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    data: { title: 'Login' },
    loadChildren: () => import('@feature/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'home',
    data: { title: 'Uribia Online' },
    component: HomeLayoutComponent,
    loadChildren: () => import('@feature/home/property/home-property.module')
      .then(m => m.HomePropertyModule)
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: 'propiedades',
        data: {
          title: 'Propiedades',
          breadcrumb: [
            { label: 'Dashboard', url: '/admin/dashboard' },
            { label: 'Propiedades', url: '' }
          ]
        },
        loadChildren: () => import('@feature/admin/property/property.module')
          .then(m => m.PropertyModule)
      },
      {
        path: 'dashboard',
        data: {
          title: 'Dashboard',
          breadcrumb: [{ label: 'Dashboard', url: '' }]
        },
        loadChildren: () => import('@feature/admin/dashboard/dashboard.module')
          .then(m => m.DashboardModule)
      },
      {
        path: 'propietarios',
        data: {
          title: 'Propietarios',
          breadcrumb: [
            { label: 'Dashboard', url: '/admin/dashboard' },
            { label: 'Propietarios', url: '' },
          ]
        },
        loadChildren: () => import('@feature/admin/owner/owner.module')
          .then(m => m.OwnerModule)
      },
      {
        path: 'barrios',
        data: {
          title: 'Barrios',
          breadcrumb: [
            { label: 'Dashboard', url: '/admin/dashboard' },
            { label: 'Barrios', url: '' }
          ]
        },
        loadChildren: () => import('@feature/admin/neighborhood/neighborhood.module')
          .then(m => m.NeighborhoodModule)
      }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
