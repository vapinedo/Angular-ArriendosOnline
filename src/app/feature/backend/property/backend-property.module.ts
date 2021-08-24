import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackendSharedModule } from '@shared/backend/backend-shared.module';
import { BackendPropertyRoutingModule } from './backend-property-routing.module';

import { PropertyAdminComponent } from './pages/admin/property-admin.component';
import { PropertyCreateComponent } from './pages/create/property-create.component';
import { PropertyDetailComponent } from './pages/detail/property-detail.component';
import { PropertyUpdateComponent } from './pages/update/property-update.component';
import { PropertyCategoryAdminComponent } from './pages/category/admin/property-category-admin.component';
import { PropertyCategoryUpdateComponent } from './pages/category/update/property-category-update.component';
import { PropertyCategoryCreateComponent } from './pages/category/create/property-category-create.component';

const modules = [
  CommonModule,
  BackendSharedModule,
  BackendPropertyRoutingModule
];

const components = [
  PropertyAdminComponent,
  PropertyCreateComponent,
  PropertyDetailComponent,
  PropertyUpdateComponent,
  PropertyCategoryAdminComponent,
  PropertyCategoryUpdateComponent,
  PropertyCategoryCreateComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class BackendPropertyModule { }
