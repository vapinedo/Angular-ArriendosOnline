import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BackendSharedModule } from '@shared/backend/backend-shared.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

const modules = [
  CommonModule,
  BackendSharedModule,
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
