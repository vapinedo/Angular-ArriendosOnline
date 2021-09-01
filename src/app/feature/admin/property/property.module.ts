import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/common/shared.module';
import { AdminSharedModule } from '@shared/admin/admin-shared.module';
import { PropertyRoutingModule } from './property-routing.module';

import { PropertyAdminComponent } from './pages/admin/property-admin.component';
import { PropertyCreateComponent } from './pages/create/property-create.component';
import { PropertyDetailComponent } from './pages/detail/property-detail.component';
import { PropertyUpdateComponent } from './pages/update/property-update.component';
import { PropertyCategoryAdminComponent } from './pages/category/admin/property-category-admin.component';
import { PropertyCategoryUpdateComponent } from './pages/category/update/property-category-update.component';
import { PropertyCategoryCreateComponent } from './pages/category/create/property-category-create.component';

const modules = [
  SharedModule,
  AdminSharedModule,
  PropertyRoutingModule
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
export class PropertyModule { }
