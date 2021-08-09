import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  public sidebarIsClosed: boolean = false;

  constructor() { }

  onToggleSidebar(): void {
    this.sidebarIsClosed = !this.sidebarIsClosed;
  }

}
