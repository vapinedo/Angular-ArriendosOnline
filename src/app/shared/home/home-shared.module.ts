import { NgModule } from '@angular/core';

import { HomeNavbarComponent } from './components/navbar/home-navbar.component';

const components = [
  HomeNavbarComponent
];

@NgModule({
  declarations: [components],
  imports: [],
  exports: [components]
})
export class HomeSharedModule { }