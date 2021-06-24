import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '@feature/admin/admin.component';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@feature/auth/auth.module')
    .then(m => m.AuthModule)
  },
  {  
    path: 'admin',
    component:  AdminComponent,
    children: [
      {  
        path: '',
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
  { path: '', redirectTo: '/admin/propiedades',  pathMatch: 'full' },
  { path: '***', redirectTo: '/admin/propiedades' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
