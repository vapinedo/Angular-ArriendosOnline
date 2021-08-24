import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontendSharedModule } from '@shared/frontend/frontend-shared.module';
import { FrontendPropertyRoutingModule } from './frontend-property-routing.module';

import { PropertyDetailComponent } from './pages/detail/property-detail.component';
import { PropertyCardGridComponent } from './pages/card-grid/property-card-grid.component';


const modules = [
  CommonModule, 
  FrontendSharedModule,
  FrontendPropertyRoutingModule
];

const components = [
  PropertyDetailComponent,
  PropertyCardGridComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class FrontendPropertyModule { }
