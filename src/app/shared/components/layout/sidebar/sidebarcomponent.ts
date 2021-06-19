import { SubSink } from 'subsink';
import { Component, OnDestroy } from '@angular/core';
import { MessageService } from '@core/services/message.service';
import { MainmenuService } from '@core/services/mainmenu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnDestroy {
  
  private subscriptions = new SubSink();
  
  public menuList!: any[];
  public sidedarIsOpen = false;
  public profileImage: string = '';
  
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
      
  onToggleSidebar(): void {
    this.sidedarIsOpen = !this.sidedarIsOpen;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}