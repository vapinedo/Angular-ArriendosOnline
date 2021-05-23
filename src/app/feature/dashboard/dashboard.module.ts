import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { HomeComponent } from './pages/home/home.component';

const modules = [
  CommonModule,
  SharedModule,
  DashboardRoutingModule
];

const components = [
  HomeComponent
];

// const entryComponents = [
// ];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
  // entryComponents:[entryComponents] 
})
export class DashboardModule { }
