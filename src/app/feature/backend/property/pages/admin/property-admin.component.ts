import { SubSink } from 'subsink';
import { MatSort } from '@angular/material/sort';
import { FileService } from '@core/services/file.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Property } from '@core/interfaces/property.interface';
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

  public title = 'Listado de Propiedades';
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['img', 'category', 'price', 'acciones'];

  constructor(
    private fileSvc: FileService,
    private messageSvc: MessageService,
    private propertySvc: PropertyService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.propertySvc.read()
        .subscribe({
          next: data => {
            this.dataSource.data = data;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          },
          error: err => this.messageSvc.error(err)
        })
    );
  }

  async onDelete(item: Property): Promise<void> {
    const deleteItem = await this.messageSvc.confirm();

    if (deleteItem.isConfirmed) {
      const files = item.images;

      try {
        let promises: any[] = [];
  
        for (let i=0; i<files.length; i++) {
          const file = files[i];
          const promise = await this.fileSvc.delete(file);
          promises.push(promise);
        }
  
        const filesHasBeenDeleted = await Promise.all(promises);
        const itemHasBeenDeleted = this.propertySvc.delete(item.id!); 
      }
      catch (err) { this.messageSvc.error(err) };
    }
  }
      
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}