import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyDetailComponent } from './pages/detail/property-detail.component';
import { PropertyCardGridComponent } from './pages/card-grid/property-card-grid.component';


const routes: Routes = [
  { path: '', component: PropertyCardGridComponent },
  { path: 'detail/:id', component: PropertyDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class FrontendPropertyRoutingModule { }