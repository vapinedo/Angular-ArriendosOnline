import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyCategoryAdminComponent } from './pages/admin/property-category-admin.component';
import { PropertyCategoryCreateComponent } from './pages/create/property-category-create.component';
import { PropertyCategoryDetailComponent } from './pages/detail/property-category-detail.component';
import { PropertyCategoryUpdateComponent } from './pages/update/property-category-update.component';


const routes: Routes = [
  { path: '', component: PropertyCategoryAdminComponent },
  { path: 'crear', component: PropertyCategoryCreateComponent },
  { path: 'editar/:id', component: PropertyCategoryUpdateComponent },
  { path: 'detalle/:id', component: PropertyCategoryDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PropertyCategoryRoutingModule { }