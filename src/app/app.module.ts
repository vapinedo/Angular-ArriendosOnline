import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { FirebaseModule } from './firebase.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from '@shared/common/shared.module';
import { HomeSharedModule } from '@shared/home/home-shared.module';
import { AdminSharedModule } from '@shared/admin/admin-shared.module';

import { AppComponent } from './app.component';
import { HomeLayoutComponent } from '@feature/home/home-layout.component';
import { AdminLayoutComponent } from '@feature/admin/admin-layout.component';
import { SidebarComponent } from '@shared/admin/components/layout/sidebar/sidebarcomponent';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeLayoutComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    SharedModule,
    AdminSharedModule,
    HomeSharedModule,
    AppRoutingModule,
    FirebaseModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
