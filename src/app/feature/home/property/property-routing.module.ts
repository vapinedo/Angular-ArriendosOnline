import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyCardGridComponent } from './pages/card-grid/property-card-grid.component';
import { PropertyDetailComponent } from '@feature/home/property/pages/detail/property-detail.component';

const routes: Routes = [
  { path: '', component: PropertyCardGridComponent },
  { path: 'propiedad-detalle/:id', component: PropertyDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }