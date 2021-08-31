import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { BackendSharedModule } from '@shared/backend/backend-shared.module';

import { LoginComponent } from './pages/login/login.component';

const modules = [
  CommonModule, 
  BackendSharedModule,
  AuthRoutingModule
];

const components = [
  LoginComponent,
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class AuthModule { }
