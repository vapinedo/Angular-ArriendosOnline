import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './guards/auth.guard';

import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';
import { DatetimeService } from './services/datetime.service';
import { MainmenuService } from './services/mainmenu.service';
import { PropertyService } from './services/property.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    MessageService,
    DatetimeService,
    MainmenuService,
    PropertyService
  ]
})
export class CoreModule { }
