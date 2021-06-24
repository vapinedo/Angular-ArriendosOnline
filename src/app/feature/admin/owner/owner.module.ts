import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { OwnerRoutingModule } from './owner-routing.module';

import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { OwnerAdminComponent } from './pages/admin/owner-admin.component';
import { OwnerCreateComponent } from './pages/create/owner-create.component';
import { OwnerUpdateComponent } from './pages/update/owner-update.component';

const modules = [
  CommonModule,
  SharedModule,
  OwnerRoutingModule
];

const components = [
  OwnerAdminComponent,
  OwnerCreateComponent,
  OwnerUpdateComponent
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
export class OwnerModule { }
