import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SpinnerComponent } from './components/loaders/spinner.component';
import { SidebarComponent } from './components/layout/sidebar/sidebarcomponent';
import { FileuploaderComponent } from './components/fileuploader/fileuploader.component';

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
  })
];

const components = [
  SidebarComponent,
  SpinnerComponent,
  FileuploaderComponent
];

@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [components, modules]
})
export class SharedModule { }