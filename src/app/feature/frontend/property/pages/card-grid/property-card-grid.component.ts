import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Property } from '@core/interfaces/property.interface';
import { MessageService } from '@core/services/message.service';
import { PropertyService } from '@core/services/property.service';

@Component({
  selector: 'app-property-card-grid',
  templateUrl: './property-card-grid.component.html',
  styleUrls: ['./property-card-grid.component.scss']
})
export class PropertyCardGridComponent implements OnInit {

  public subscriptions = new Subscription();

  public properties: Property[] = [];
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
      this.propertyScv.getAll()
        .subscribe({
          next: data => {
            this.properties = data;
          }
        })
    );
  }

}