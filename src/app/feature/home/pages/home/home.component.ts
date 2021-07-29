import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '@core/services/message.service';
import { Property } from '@core/interfaces/property.interface';
import { PropertyService } from '@core/services/property.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public subscriptions = new Subscription();

  public data: Property[] = [];
  public title = 'Arriendos Online';
  public showSpinner: boolean = false;
  
  constructor( 
    private router: Router,
    private messageSvc: MessageService,
    private propertyScv: PropertyService
  ) {}

  ngOnInit(): void {
    this.setData();
  }

  private setData() {
    this.subscriptions.add(
      this.propertyScv.read()
        .subscribe({
          next: data => {
            console.log(data);
            this.data = data;
          }
        })
    );
  }

}