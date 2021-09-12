import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DialogComponent } from './components/dialog/dialog.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';

const components = [
  DialogComponent,
  FileUploaderComponent
];

const modules = [
  CommonModule,
  MaterialModule,
  ReactiveFormsModule,
  FormsModule
];

@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [modules, components]
})
export class AdminSharedModule { }