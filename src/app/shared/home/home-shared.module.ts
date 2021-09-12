import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeNavbarComponent } from './components/navbar/home-navbar.component';

const components = [
  HomeNavbarComponent
];

const modules = [
  CommonModule,
];

@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [components, modules]
})
export class HomeSharedModule { }