import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public sidebarIsClosed: boolean = false;

  constructor() { }

  onToggleSidebar(): void {
    this.sidebarIsClosed = !this.sidebarIsClosed;
  }

}
