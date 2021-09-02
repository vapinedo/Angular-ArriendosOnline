import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  public sectionTitle: string = 'Sección';
  public sidebarIsClosed: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) {
    const route = activatedRoute;
    const title = this.getSectionTitle(route);
    console.log('Title', title);
  }
  
  onToggleSidebar(): void {
    this.sidebarIsClosed = !this.sidebarIsClosed;
  }
  
  getSectionTitle(route: ActivatedRoute) {
    
  }

}
