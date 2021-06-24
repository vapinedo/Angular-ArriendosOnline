import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  public sidebarIsClosed: boolean = false;

  constructor() { }

  onToggleSidebar(): void {
    this.sidebarIsClosed = !this.sidebarIsClosed;
  }

}