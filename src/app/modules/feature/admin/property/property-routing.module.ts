import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyUpdateComponent } from './pages/update/property-update.component';
import { PropertyAdminComponent } from './pages/admin/property-admin.component';
import { PropertyCreateComponent } from './pages/create/property-create.component';
import { PropertyDetailComponent } from './pages/detail/property-detail.component';
import { PropertyCategoryAdminComponent } from './pages/category/admin/property-category-admin.component';
import { PropertyCategoryUpdateComponent } from './pages/category/update/property-category-update.component';
import { PropertyCategoryCreateComponent } from './pages/category/create/property-category-create.component';

const routes: Routes = [
  { path: '', component: PropertyAdminComponent },
  { 
    path: 'crear', 
    component: PropertyCreateComponent, 
    data: { 
      title: 'Nueva propiedad',
      breadcrumb: [
        { label: 'Dashboard', url: '/admin/dashboard' },
        { label: 'Propiedades', url: '/admin/' },
        { label: 'Nueva propiedad', url: '' }
      ]
    }
  },
  { 
    path: 'editar/:id', 
    component: PropertyUpdateComponent, 
    data: { 
      title: 'Editar propiedad',
      breadcrumb: [
        { label: 'Dashboard', url: '/admin/dashboard' },
        { label: 'Propiedades', url: '/admin/' },
        { label: 'Nueva propiedad', url: '' }
      ]
    }
  },
  { path: 'detalle/:id', component: PropertyDetailComponent },
  { path: 'categorias', component: PropertyCategoryAdminComponent },
  { path: 'crear-categoria', component: PropertyCategoryCreateComponent },
  { path: 'editar-categoria', component: PropertyCategoryUpdateComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }