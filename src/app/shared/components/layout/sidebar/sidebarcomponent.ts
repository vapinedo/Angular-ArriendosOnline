import { SubSink } from 'subsink';
import { Component, OnDestroy } from '@angular/core';
import { MessageService } from '@core/services/message.service';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnDestroy {
  
  private subscriptions = new SubSink();
  
  public menu: any;
  public profileImage: string = '';
  public showSubmenu: boolean = false;
  public sidedarIsOpen: boolean = false;
  
  constructor(
    private sidebarSvc: SidebarService,
    private messageSvc: MessageService
  ) { 
    this._setMenu();
  }

  private _setMenu() {
    this.subscriptions.add(
      this.sidebarSvc.read()
        .subscribe({
          next: data => {
              console.log(data);
              this.menu = data;
          },
          error: err => this.messageSvc.error(err)
        })
    );
  }
      
  onToggleSidebar(): void {
    this.sidedarIsOpen = !this.sidedarIsOpen;
  }

  onToggleSubmenu(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}