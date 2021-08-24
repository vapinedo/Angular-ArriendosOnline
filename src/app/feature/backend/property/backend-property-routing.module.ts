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
  { path: 'crear', component: PropertyCreateComponent },
  { path: 'editar/:id', component: PropertyUpdateComponent },
  { path: 'detalle/:id', component: PropertyDetailComponent },
  { path: 'categorias', component: PropertyCategoryAdminComponent },
  { path: 'actualizar-categoria', component: PropertyCategoryUpdateComponent },
  { path: 'crear-categoria', component: PropertyCategoryCreateComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class BackendPropertyRoutingModule { }