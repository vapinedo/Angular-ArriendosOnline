import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '@shared/common/shared.module';
import { AdminSharedModule } from '@shared/admin/admin-shared.module';

import { LoginComponent } from './pages/login/login.component';

const modules = [
  SharedModule,
  AdminSharedModule,
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
