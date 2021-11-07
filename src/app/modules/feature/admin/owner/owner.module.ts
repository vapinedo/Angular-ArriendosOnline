import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/common/shared.module';
import { AdminSharedModule } from '@shared/admin/admin-shared.module';
import { OwnerRoutingModule } from './owner-routing.module';

import { OwnerAdminComponent } from './pages/admin/owner-admin.component';
import { OwnerCreateComponent } from './pages/create/owner-create.component';
import { OwnerUpdateComponent } from './pages/update/owner-update.component';
import { DialogComponent } from '@shared/admin/components/dialog/dialog.component';

const modules = [
  SharedModule,
  AdminSharedModule,
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
