import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { PropertyRoutingModule } from './property-routing.module';

import { PropertyDetailComponent } from './pages/detail/property-detail.component';
import { PropertyCardGridComponent } from './pages/card-grid/property-card-grid.component';


const modules = [
  CommonModule, 
  SharedModule,
  PropertyRoutingModule
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
export class PropertyModule { }
