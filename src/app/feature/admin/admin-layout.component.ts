import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd, Data } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  public sectionTitle: string = '';
  public sidebarIsClosed: boolean = false;

  constructor (
    private router: Router,
    private titleSvc: Title,
    private activatedRoute: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.getCurrenRoute();
  }

  getCurrenRoute() {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      const childRoute = this.getChild(this.activatedRoute);
      childRoute.data.subscribe(data => {
        this.sectionTitle = this.getSectionTitle(data)
      });
    });
  }

  getSectionTitle(dataRoute: Data): string {
    return dataRoute.title ? dataRoute.title : 'Sin título';
  }

  getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } 
    return activatedRoute;
  }
  
  onToggleSidebar(): void {
    this.sidebarIsClosed = !this.sidebarIsClosed;
  }
  
}
