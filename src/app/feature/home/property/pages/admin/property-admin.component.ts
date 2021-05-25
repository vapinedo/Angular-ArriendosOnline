import { SubSink } from 'subsink';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PropertyService } from '@core/services/property.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Property } from '@core/interfaces/property.interface';

@Component({
  selector: 'app-property-admin',
  templateUrl: './property-admin.component.html',
  styleUrls: ['./property-admin.component.scss']
})
export class PropertyAdminComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public title = 'Propiedades';
  public data: Property[] = [];
  public dataSource = new MatTableDataSource(this.data);
  public displayedColumns: string[] = ['img', 'type', 'price', 'acciones'];

  constructor(
    private propertySvc: PropertyService
  ) {}

  ngOnInit(): void {
    this._setDataSource();
  }

  private _setDataSource(): void  {
    this.subscriptions.add(
      this.propertySvc.getAll()
        .subscribe({
          next: data => {
            console.log(data);
            this.data = data;
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        })
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}