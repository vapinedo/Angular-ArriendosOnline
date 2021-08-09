import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '@core/interfaces/property.interface';
import { PropertyService } from '@core/services/property.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {

  public showSpinner: boolean = false;
  public property!: Property | undefined;
  
  constructor( 
    private router: Router,
    private propertyScv: PropertyService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.showSpinner = true;
    const propertyID = this.activatedRoute.snapshot.params.id;
    this.getProperty(propertyID);
  }

  getProperty(propertyID: string) {
    this.propertyScv.readOne(propertyID)
    .subscribe({
      next: property => {
        this.property = property;
        this.showSpinner = false;
      }
    })
  }

}