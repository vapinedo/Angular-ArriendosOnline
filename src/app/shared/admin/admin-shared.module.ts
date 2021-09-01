import { NgModule } from '@angular/core';

import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const modules = [
  MaterialModule,
  ReactiveFormsModule,
  FormsModule
];

@NgModule({
  declarations: [],
  imports: [modules],
  exports: [modules]
})
export class AdminSharedModule { }