import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMaskModule } from 'ngx-mask'
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SpinnerComponent } from './components/loaders/spinner.component';
import { SidebarComponent } from './components/layout/sidebar/sidebarcomponent';

const modules = [
  CommonModule,
  ToastrModule,
  RouterModule,
  MaterialModule,
  ReactiveFormsModule,
  FormsModule,
  ToastrModule.forRoot({
    maxOpened: 3,
    timeOut: 7000,
    autoDismiss: true,
    preventDuplicates: true,
    positionClass: 'toast-top-right'
  }),
  NgxMaskModule.forRoot({
    showMaskTyped: false,
    dropSpecialCharacters: false
    // clearIfNotMatch: true
  })
];

const components = [
  SidebarComponent,
  SpinnerComponent
];

@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [components, modules]
})
export class BackendSharedModule { }