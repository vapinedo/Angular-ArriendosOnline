import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Component, Input, OnDestroy } from '@angular/core';
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
  public showSubmenu: boolean = false;
  public title: string = 'Uribia Online';
  public profileImage: string = '../../../../../assets/img/profile.jpg';

  @Input() sidebarIsClosed: boolean = false;
  
  constructor(
    private router: Router,
    private authSvc: AuthService,
    private sidebarSvc: SidebarService,
    private messageSvc: MessageService
  ) { 
    this._setMenu();

    this.authSvc.getCurrentUser()
      .subscribe(console.log);
  }

  private _setMenu() {
    this.subscriptions.add(
      this.sidebarSvc.read()
        .subscribe({
          next: data => {
              this.menu = data;
          },
          error: err => this.messageSvc.error(err)
        })
    );
  }
      
  onToggleSubmenu(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  async onLogout(): Promise<void> {
    try {
      const response = this.authSvc.logout();
      this.router.navigate(['/auth']);
    }
    catch (err) {
      this.messageSvc.error(err); 
    }            
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}