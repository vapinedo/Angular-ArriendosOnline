import { SubSink } from 'subsink';
import { Component, OnDestroy } from '@angular/core';
import { MessageService } from '@core/services/message.service';
import { MainmenuService } from '@core/services/mainmenu.service';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent implements OnDestroy {
  
  private subscriptions = new SubSink();
  
  public menuList!: any[];
  public sidedarIsOpen = false;
  public currentActiveMenu!: object;
  
  constructor(
    private messageSvc: MessageService,
    private mainmenuSvc: MainmenuService
  ) { 
    this._setMenu();
  }

  private _setMenu() {
    this.subscriptions.add(
      this.mainmenuSvc.getMenu()
      .subscribe({
        next: data => {
            console.log(data);
            this.menuList = data;
          },
          error: err => this.messageSvc.error(err)
        })
        );
      }
      
  onShowMenu(menu: object) {
    this.sidedarIsOpen = true;
    this.currentActiveMenu = menu;
  }

  onCloseSidebar(): void {
    this.sidedarIsOpen = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}