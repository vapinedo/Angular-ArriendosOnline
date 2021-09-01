import { SubSink } from 'subsink';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '@core/services/message.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PropertyCategoryService } from '@core/services/property-category.service';
import { DialogComponent } from '@shared/admin/components/dialog/dialog.component';
import { PropertyCategoryCreateComponent } from '../create/property-category-create.component';
import { PropertyCategoryUpdateComponent } from '../update/property-category-update.component';

@Component({
  selector: 'app-property-category-admin',
  templateUrl: './property-category-admin.component.html',
  styleUrls: ['./property-category-admin.component.scss']
})
export class PropertyCategoryAdminComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public title = 'Listado de Categorías de propiedades';
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['name', 'visible', 'acciones'];

  constructor(
    public dialog: MatDialog,
    private messageSvc: MessageService,
    private propertyCategorySvc: PropertyCategoryService
  ) {}

  ngOnInit(): void {
    this._setDatasource();
  }

  private _setDatasource(): void {
    this.subscriptions.add(
      this.propertyCategorySvc.getAll()
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

  onCreate(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50vw',
      disableClose: true,
      data: { 
        dataComponent: { title: 'Nueva categoría de propiedad' },
        component: PropertyCategoryCreateComponent
      }
    });

    this.subscriptions.add(
      dialogRef.afterClosed()
        .subscribe(success => {
          if(success) {
            this._setDatasource();
          }
        })
    )
  }  

  onUpdate(id: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50vw',
      disableClose: true,
      data: { 
        dataComponent: { id, title: 'Actualizar categoría de propiedad' },
        component: PropertyCategoryUpdateComponent
      }
    });

    this.subscriptions.add(
      dialogRef.afterClosed()
        .subscribe(success => {
          if(success) {
            this._setDatasource();
          }
        })
    )
  }  

  onDelete(id: string): void {
    this.messageSvc.confirm()
      .then((result) => {
        if (result.isConfirmed) {
          this.propertyCategorySvc.delete(id) 
            .then(resolve => {
              console.log(resolve);
              this.messageSvc.success('Registro eliminado exitosamente')
            })
            .catch(err => this.messageSvc.error(err))
        }
      })
      .catch(error => this.messageSvc.error(error));
  }
      
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}