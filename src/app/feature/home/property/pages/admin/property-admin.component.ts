import { SubSink } from 'subsink';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '@core/services/message.service';
import { PropertyService } from '@core/services/property.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

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
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['img', 'type', 'price', 'acciones'];

  constructor(
    private messageSvc: MessageService,
    private propertySvc: PropertyService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.propertySvc.getAll()
        .subscribe({
          next: data => {
            this.dataSource.data = data;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: err => this.messageSvc.error('Error al cargar información')
        })
    );
  }

  onDelete(id: string): void {
    this.messageSvc.confirm()
      .then((result) => {
        if (result.isConfirmed) {
          this.propertySvc.delete(id) 
            .then(() => {
              this.messageSvc.success('Registro eliminado exitosamente')
            })
            .catch(error => this.messageSvc.error('Error al eliminar registro'))
        }
      })
      .catch(error => this.messageSvc.error(error));
  }
      
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}