import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../custom/custom-material.module';

import { DialogComponent } from './components/dialog/dialog.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';

const components = [
  DialogComponent,
  FileUploaderComponent
];

const modules = [
  CommonModule,
  ReactiveFormsModule,
  CustomMaterialModule,
  FormsModule
];

@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [modules, components]
})
export class AdminSharedModule { }