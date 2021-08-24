import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { BackendSharedModule } from '@shared/backend/backend-shared.module';

import { OwnerAdminComponent } from './pages/admin/owner-admin.component';
import { OwnerCreateComponent } from './pages/create/owner-create.component';
import { OwnerUpdateComponent } from './pages/update/owner-update.component';
import { DialogComponent } from '@shared/backend/components/dialog/dialog.component';

const modules = [
  CommonModule,
  BackendSharedModule,
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
