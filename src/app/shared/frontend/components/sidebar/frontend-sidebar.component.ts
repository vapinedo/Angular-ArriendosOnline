import { Observable } from 'rxjs';
import { Filter } from '@core/interfaces/filter.interface';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NeighborhoodService } from '@core/services/neighborhood.service';
import { PropertyCategory } from '@core/interfaces/property-category.interface';
import { PropertyCategoryService } from '@core/services/property-category.service';

@Component({
  selector: 'app-frontend-sidebar',
  templateUrl: './frontend-sidebar.component.html',
  styleUrls: ['./frontend-sidebar.component.scss']
})
export class FrontendSidebarComponent implements OnInit {

  @Output() onFilterChange = new EventEmitter<Filter>();

  public categories$!: Observable<PropertyCategory[]>
  public neighborhoods$!: Observable<PropertyCategory[]>
  public filters: Filter = { category: null, neighborhood: null }; 

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
    this.onFilterChange.emit(this.filters);
  }

  onCategoryFilterReset(): void {
    this.filters.category = null;
    this.onFilterChange.emit(this.filters);
  }

  onNeighborhoodFilterChange(selectedOption: string): void {
    this.filters.neighborhood = selectedOption;
    this.onFilterChange.emit(this.filters);
  }

  onNeighborhoodFilterReset(): void {
    this.filters.neighborhood = null;
    this.onFilterChange.emit(this.filters);
  }

}