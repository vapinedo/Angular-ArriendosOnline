import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, } from '@angular/core';
import { Property } from '@core/interfaces/property.interface';
import { PropertyService } from '@core/services/property.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {

  public property$!: Observable<Property | undefined>;
  
  constructor( 
    private propertyScv: PropertyService,
    private activatedRoute: ActivatedRoute
    ) {}
    
  ngOnInit(): void {
    const propertyID = this.activatedRoute.snapshot.params.id;
    this.getProperty(propertyID);
  }
  
  getProperty(propertyID: string) {
    this.property$ = this.propertyScv.readOne(propertyID);
  }

  onSetNewFeatureImage(imgURL: string) {
    const featuredImg = document.getElementById('featuredImg');
    featuredImg?.setAttribute('src', imgURL);
  }
  
}