import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NeighborhoodAdminComponent } from './pages/admin/neighborhood-admin.component';

const routes: Routes = [
  { path: 'barrios', component: NeighborhoodAdminComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class NeighborhoodRoutingModule { }