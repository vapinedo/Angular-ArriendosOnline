import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Property } from '@core/interfaces/property.interface';
import { PropertyService } from '@core/services/property.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();
  public property$!: Observable<Property | undefined>;
  
  constructor( 
    private propertyScv: PropertyService,
    private activatedRoute: ActivatedRoute
    ) {}
    
  ngOnInit(): void {
    const propertyID = this.activatedRoute.snapshot.params.id;
    this.property$ = this.propertyScv.getByID(propertyID);
  }
  
  onSetNewFeatureImage(imgURL: string) {
    const featuredImg = document.getElementById('featuredImg');
    featuredImg?.setAttribute('src', imgURL);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
}