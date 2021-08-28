import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Filter } from '@core/interfaces/filter.interface';
import { NeighborhoodService } from '@core/services/neighborhood.service';
import { PropertyCategory } from '@core/interfaces/property-category.interface';
import { PropertyCategoryService } from '@core/services/property-category.service';

@Component({
  selector: 'app-frontend-sidebar',
  templateUrl: './frontend-sidebar.component.html',
  styleUrls: ['./frontend-sidebar.component.scss']
})
export class FrontendSidebarComponent implements OnInit {

  public filters: Filter = {
    category: null,
    neighborhood: null
  }; 
  public categories$!: Observable<PropertyCategory[]>
  public neighborhoods$!: Observable<PropertyCategory[]>

  constructor(
    private neighborhoodSvc: NeighborhoodService,
    private propertyCategorySvc: PropertyCategoryService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.propertyCategorySvc.getAll();
    this.neighborhoods$ = this.neighborhoodSvc.getAll();
  }

  onCategoryFilterChange(selectedOption: string): void {
    this.filters.category = selectedOption;
  }

  onNeighborhoodFilterChange(selectedOption: string): void {
    this.filters.neighborhood = selectedOption;
  }

}