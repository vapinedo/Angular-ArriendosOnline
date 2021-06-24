import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyCategoryAdminComponent } from './pages/admin/property-category-admin.component';


const routes: Routes = [
  { path: '', component: PropertyCategoryAdminComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PropertyCategoryRoutingModule { }