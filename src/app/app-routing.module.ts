import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@feature/home/home.component';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@feature/auth/auth.module')
    .then(m => m.AuthModule)
  },
  {  
    path: 'home',
    component:  HomeComponent,
    children: [
      {  
        path: '',
        loadChildren: () => import('@feature/home/dashboard/dashboard.module')
        .then(m => m.DashboardModule)
      },
      {  
        path: 'propiedades',
        loadChildren: () => import('@feature/home/property/property.module')
        .then(m => m.PropertyModule)
      },
      {  
        path: 'propiedad-categorias',
        loadChildren: () => import('@feature/home/property-category/property-category.module')
        .then(m => m.PropertyCategoryModule)
      },      
      {  
        path: 'barrios',
        loadChildren: () => import('@feature/home/neighborhood/neighborhood.module')
        .then(m => m.NeighborhoodModule)
      }      
    ]
  },
  { path: '', redirectTo: '/home/propiedades',  pathMatch: 'full' },
  { path: '***', redirectTo: '/home/propiedades' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
