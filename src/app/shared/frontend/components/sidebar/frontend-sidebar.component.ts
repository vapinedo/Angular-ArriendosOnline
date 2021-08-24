import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-frontend-sidebar',
  templateUrl: './frontend-sidebar.component.html',
  styleUrls: ['./frontend-sidebar.component.scss']
})
export class FrontendSidebarComponent {

  public subscriptions = new Subscription();

  constructor( 
    private router: Router,
  ) {}

}