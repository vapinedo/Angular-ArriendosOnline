import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd, Data } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

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
      childRoute.data.subscribe(data => this.setTitle(data));
    });
  }

  setTitle(dataRoute: Data) {
    const pageTitle = dataRoute.title ? dataRoute.title : 'Sin título';
    this.titleSvc.setTitle(pageTitle);
  }

  getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } 
    return activatedRoute;
  }

}
