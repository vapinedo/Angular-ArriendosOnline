import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { PropertyRoutingModule } from './property-routing.module';

import { PropertyEditComponent } from './pages/edit/property-edit.component';
import { PropertyAdminComponent } from './pages/admin/property-admin.component';
import { PropertyCreateComponent } from './pages/create/property-create.component';
import { PropertyDetailComponent } from './pages/detail/property-detail.component';

const modules = [
  CommonModule,
  SharedModule,
  PropertyRoutingModule
];

const components = [
  PropertyEditComponent,
  PropertyAdminComponent,
  PropertyCreateComponent,
  PropertyDetailComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class PropertyModule { }
