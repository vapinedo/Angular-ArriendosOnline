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
  
  public menu!: any[];
  public submenuActive!: object;
  public sidedarIsOpen = false;
  
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
            this.menu = data;
          },
          error: err => this.messageSvc.error(err)
        })
    );
  }

  onOpenSidebar(selectedItemMenu: object) {
    this.submenuActive = selectedItemMenu;
    this.sidedarIsOpen = true;
  }

  onCloseSidebar(): void {
    this.sidedarIsOpen = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}