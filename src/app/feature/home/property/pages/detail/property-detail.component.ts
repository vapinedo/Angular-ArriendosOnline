import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PropertyService } from '@core/services/property.service';
import { Property } from '@core/interfaces/property.interface';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {

  public title = 'Propiedad Detalle';
  public property$!: Observable<Property | undefined>;

  constructor(
    private propertySvc: PropertyService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.property$ = this.propertySvc.readOne(id);
  }
}