import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

const modules = [
  CommonModule,
  SharedModule,
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
