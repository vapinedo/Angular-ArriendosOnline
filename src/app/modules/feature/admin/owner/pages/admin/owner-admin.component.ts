import { SubSink } from 'subsink';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { OwnerService } from '@core/services/owner.service';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '@core/services/message.service';
import { OwnerCreateComponent } from '../create/owner-create.component';
import { OwnerUpdateComponent } from '../update/owner-update.component';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@shared/admin/components/dialog/dialog.component';

@Component({
  selector: 'app-owner-admin',
  templateUrl: './owner-admin.component.html',
  styleUrls: ['./owner-admin.component.scss']
})
export class OwnerAdminComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['name', 'lastname', 'mobile', 'acciones'];

  constructor(
    public dialog: MatDialog,
    private ownerSvc: OwnerService,
    private messageSvc: MessageService
  ) {}

  ngOnInit(): void {
    this._setDatasource();
  }

  private _setDatasource(): void {
    this.subscriptions.add(
      this.ownerSvc.getAll()
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
        dataComponent: { title: 'Nuevo propietario' },
        component: OwnerCreateComponent
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
        dataComponent: { id, title: 'Actualizar propietario' },
        component: OwnerUpdateComponent
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
          this.ownerSvc.delete(id) 
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