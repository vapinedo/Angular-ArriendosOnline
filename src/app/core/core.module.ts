import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './guards/auth.guard';

import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';
import { SidebarService } from './services/sidebar.service';
import { PropertyService } from './services/property.service';
import { DatetimeService } from './services/datetime.service';
import { ValidatorsService } from './services/validators.service';
import { FileuploaderService } from './services/fileuploader.service';
import { PropertyCategoryService } from './services/property-category.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    MessageService,
    SidebarService,
    DatetimeService,
    PropertyService,
    ValidatorsService,
    FileuploaderService,
    PropertyCategoryService
  ]
})
export class CoreModule { }
