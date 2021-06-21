import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { PropertyCategoryRoutingModule } from './property-category-routing.module';

import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { PropertyCategoryAdminComponent } from './pages/admin/property-category-admin.component';
import { PropertyCategoryCreateComponent } from './pages/create/property-category-create.component';
import { PropertyCategoryUpdateComponent } from './pages/update/property-category-update.component';

const modules = [
  CommonModule,
  SharedModule,
  PropertyCategoryRoutingModule
];

const components = [
  PropertyCategoryAdminComponent,
  PropertyCategoryCreateComponent,
  PropertyCategoryUpdateComponent
];

const entryComponents = [
  DialogComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules],
  entryComponents:[entryComponents] 
})
export class PropertyCategoryModule { }
