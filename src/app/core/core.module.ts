import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './guards/auth.guard';

import { AuthService } from './services/auth.service';
import { FileService } from './services/file.service';
import { OwnerService } from './services/owner.service';
import { MessageService } from './services/message.service';
import { SidebarService } from './services/sidebar.service';
import { PropertyService } from './services/property.service';
import { DatetimeService } from './services/datetime.service';
import { ValidatorsService } from './services/validators.service';
import { NeighborhoodService } from './services/neighborhood.service';
import { PropertyCategoryService } from './services/property-category.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    OwnerService,
    MessageService,
    SidebarService,
    DatetimeService,
    PropertyService,
    ValidatorsService,
    FileService,
    NeighborhoodService,
    PropertyCategoryService
  ]
})
export class CoreModule { }
