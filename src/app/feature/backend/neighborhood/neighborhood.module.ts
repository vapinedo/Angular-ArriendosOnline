import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NeighborhoodRoutingModule } from './neighborhood-routing.module';
import { BackendSharedModule } from '@shared/backend/backend-shared.module';

import { DialogComponent } from '@shared/backend/components/dialog/dialog.component';
import { NeighborhoodAdminComponent } from './pages/admin/neighborhood-admin.component';
import { NeighborhoodCreateComponent } from './pages/create/neighborhood-create.component';
import { NeighborhoodUpdateComponent } from './pages/update/neighborhood-update.component';

const modules = [
  CommonModule,
  BackendSharedModule,
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
