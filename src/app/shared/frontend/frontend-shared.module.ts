import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMaskModule } from 'ngx-mask';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './components/loaders/spinner.component';
import { NotResultComponent } from './components/not-result/not-result.component';
import { FrontendSidebarComponent } from './components/sidebar/frontend-sidebar.component';

const modules = [
  CommonModule,
  RouterModule,
  NgxMaskModule .forRoot({
    showMaskTyped: false,
    dropSpecialCharacters: false
    // clearIfNotMatch: true
  })
];

const components = [
  NavbarComponent,
  SpinnerComponent,
  NotResultComponent,
  FrontendSidebarComponent
];

@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [components, modules]
})
export class FrontendSharedModule { }