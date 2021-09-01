import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

import { SpinnerComponent } from './components/loaders/spinner.component';
import { NotResultComponent } from './components/not-result/not-result.component';

const modules = [
  CommonModule,
  RouterModule,
  ToastrModule,
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
  NotResultComponent
];

@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [components, modules]
})
export class SharedModule { }