import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';


const modules = [
  CommonModule, 
  SharedModule,
  HomeRoutingModule
];

const components = [
  HomeComponent,
  NavbarComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class HomeModule { }
