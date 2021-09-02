import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';

import { SpinnerComponent } from './components/loaders/spinner.component';
import { NotResultComponent } from './components/not-result/not-result.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

const modules = [
  CommonModule,
  RouterModule,
  ToastrModule,
  NgDynamicBreadcrumbModule,
  NgxMaskModule .forRoot({
    showMaskTyped: false,
    dropSpecialCharacters: false
  }),
  ToastrModule.forRoot({
    maxOpened: 3,
    timeOut: 7000,
    autoDismiss: true,
    preventDuplicates: true,
    positionClass: 'toast-top-right'
  })
];

const components = [
  SpinnerComponent,
  NotResultComponent,
  BreadcrumbsComponent
];

@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [components, modules]
})
export class SharedModule { }