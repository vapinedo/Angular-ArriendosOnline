import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './guards/auth.guard';

import { MessageService } from './services/message.service';
import { DatetimeService } from './services/datetime.service';
import { MainmenuService } from './services/mainmenu.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    MessageService,
    DatetimeService,
    MainmenuService
  ]
})
export class CoreModule { }
