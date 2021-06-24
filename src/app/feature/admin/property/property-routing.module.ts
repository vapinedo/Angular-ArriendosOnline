import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyUpdateComponent } from './pages/update/property-update.component';
import { PropertyAdminComponent } from './pages/admin/property-admin.component';
import { PropertyCreateComponent } from './pages/create/property-create.component';
import { PropertyDetailComponent } from './pages/detail/property-detail.component';

const routes: Routes = [
  { path: '', component: PropertyAdminComponent },
  { path: 'crear', component: PropertyCreateComponent },
  { path: 'editar/:id', component: PropertyUpdateComponent },
  { path: 'detalle/:id', component: PropertyDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }