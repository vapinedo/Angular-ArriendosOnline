import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePropertyListComponent } from './pages/list/home-property-list.component';
import { HomePropertyDetailComponent } from './pages/detail/home-property-detail.component';


const routes: Routes = [
  { path: 'listar', component: HomePropertyListComponent },
  { path: 'detail/:id', component: HomePropertyDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class HomePropertyRoutingModule { }