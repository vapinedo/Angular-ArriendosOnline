import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { FirebaseModule } from './firebase.module';
import { AppRoutingModule } from './app-routing.module';
import { BackendSharedModule } from '@shared/backend/backend-shared.module';
import { FrontendSharedModule } from '@shared/frontend/frontend-shared.module';

import { AppComponent } from './app.component';
import { FrontendLayoutComponent } from '@feature/frontend/frontend-layout.component';
import { BackendLayoutComponent } from '@feature/backend/backend-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    BackendLayoutComponent,
    FrontendLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    BackendSharedModule,
    FrontendSharedModule,
    AppRoutingModule,
    FirebaseModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
