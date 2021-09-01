import { SubSink } from 'subsink';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '@core/services/message.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NeighborhoodService } from '@core/services/neighborhood.service';
import { DialogComponent } from '@shared/admin/components/dialog/dialog.component';
import { NeighborhoodCreateComponent } from '../create/neighborhood-create.component';
import { NeighborhoodUpdateComponent } from '../update/neighborhood-update.component';

@Component({
  selector: 'app-neighborhood-admin',
  templateUrl: './neighborhood-admin.component.html',
  styleUrls: ['./neighborhood-admin.component.scss']
})
export class NeighborhoodAdminComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public title = 'Listado de barrios';
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['name', 'visible', 'acciones'];

  constructor(
    public dialog: MatDialog,
    private messageSvc: MessageService,
    private neighborhoodSvc: NeighborhoodService
  ) {}

  ngOnInit(): void {
    this._setDatasource();
  }

  private _setDatasource(): void {
    this.subscriptions.add(
      this.neighborhoodSvc.getAll()
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
        dataComponent: { title: 'Nuevo barrio' },
        component: NeighborhoodCreateComponent
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
        dataComponent: { id, title: 'Actualizar barrio' },
        component: NeighborhoodUpdateComponent
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
          this.neighborhoodSvc.delete(id) 
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