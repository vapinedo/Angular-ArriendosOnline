import { Component } from '@angular/core';

@Component({
  selector: 'app-backend-layout',
  templateUrl: './backend-layout.component.html',
  styleUrls: ['./backend-layout.component.scss']
})
export class BackendLayoutComponent {

  public sidebarIsClosed: boolean = false;

  onToggleSidebar(): void {
    this.sidebarIsClosed = !this.sidebarIsClosed;
  }

}
