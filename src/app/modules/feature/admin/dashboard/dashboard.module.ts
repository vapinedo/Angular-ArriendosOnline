import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/common/shared.module';
import { AdminSharedModule } from '@shared/admin/admin-shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

const modules = [
  SharedModule,
  AdminSharedModule,
  DashboardRoutingModule
];

const components = [
  DashboardComponent,
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class DashboardModule { }
