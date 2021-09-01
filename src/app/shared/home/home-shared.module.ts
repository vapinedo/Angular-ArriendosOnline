import { NgModule } from '@angular/core';

import { HomeNavbarComponent } from './components/navbar/home-navbar.component';
import { HomeSidebarComponent } from './components/sidebar/home-sidebar.component';

const components = [
  HomeNavbarComponent,
  HomeSidebarComponent
];

@NgModule({
  declarations: [components],
  imports: [],
  exports: [components]
})
export class HomeSharedModule { }