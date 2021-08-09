import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth']);

import { HomeLayoutComponent } from '@feature/home/home-layout.component';
import { AdminLayoutComponent } from '@feature/admin/admin-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@feature/auth/auth.module')
    .then(m => m.AuthModule)
  },
  { 
    path: 'home',
    component: HomeLayoutComponent,
    loadChildren: () => import('@feature/home/property/property.module')
    .then(m => m.PropertyModule)
  },
  {  
    path: 'admin',
    component:  AdminLayoutComponent,
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {  
        path: 'home',
        loadChildren: () => import('@feature/admin/dashboard/dashboard.module')
        .then(m => m.DashboardModule)
      },
      {  
        path: 'propiedades',
        loadChildren: () => import('@feature/admin/property/property.module')
        .then(m => m.PropertyModule)
      },
      {  
        path: 'propietarios',
        loadChildren: () => import('@feature/admin/owner/owner.module')
        .then(m => m.OwnerModule)
      },      
      {  
        path: 'propiedad-categorias',
        loadChildren: () => import('@feature/admin/property-category/property-category.module')
        .then(m => m.PropertyCategoryModule)
      },      
      {  
        path: 'barrios',
        loadChildren: () => import('@feature/admin/neighborhood/neighborhood.module')
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
