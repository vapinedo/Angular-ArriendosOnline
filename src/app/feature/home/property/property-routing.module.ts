import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyAdminComponent } from './pages/admin/property-admin.component';

const routes: Routes = [
  { path: '', component: PropertyAdminComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }