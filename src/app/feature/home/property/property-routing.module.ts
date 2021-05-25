import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyAdminComponent } from './pages/admin/property-admin.component';
import { PropertyDetailComponent } from './pages/create/property-detail.component';

const routes: Routes = [
  { path: '', component: PropertyAdminComponent },
  { path: 'detail/:id', component: PropertyDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }