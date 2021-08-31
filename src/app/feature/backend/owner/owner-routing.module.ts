import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnerAdminComponent } from './pages/admin/owner-admin.component';

const routes: Routes = [
  { path: 'propietarios', component: OwnerAdminComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }