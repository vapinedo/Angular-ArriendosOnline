import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/common/shared.module';
import { AdminSharedModule } from '@shared/admin/admin-shared.module';
import { NeighborhoodRoutingModule } from './neighborhood-routing.module';

import { DialogComponent } from '@shared/admin/components/dialog/dialog.component';
import { NeighborhoodAdminComponent } from './pages/admin/neighborhood-admin.component';
import { NeighborhoodCreateComponent } from './pages/create/neighborhood-create.component';
import { NeighborhoodUpdateComponent } from './pages/update/neighborhood-update.component';

const modules = [
  SharedModule,
  AdminSharedModule,
  NeighborhoodRoutingModule
];

const components = [
  NeighborhoodAdminComponent,
  NeighborhoodCreateComponent,
  NeighborhoodUpdateComponent
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
export class NeighborhoodModule { }
