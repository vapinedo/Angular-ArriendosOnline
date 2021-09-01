import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/common/shared.module';
import { HomeSharedModule } from '@shared/home/home-shared.module';
import { HomePropertyRoutingModule } from './home-property-routing.module';

import { HomePropertyListComponent } from './pages/list/home-property-list.component';
import { HomePropertyDetailComponent } from './pages/detail/home-property-detail.component';


const modules = [
  SharedModule,
  HomeSharedModule,
  HomePropertyRoutingModule
];

const components = [
  HomePropertyListComponent,
  HomePropertyDetailComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class HomePropertyModule { }
