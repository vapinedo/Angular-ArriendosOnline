import { SubSink } from 'subsink';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '@core/services/message.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Neighborhood } from '@core/interfaces/neighborhood.interface';
import { NeighborhoodService } from '@core/services/neighborhood.service';
import { DialogComponent } from '@shared/admin/components/dialog/dialog.component';

@Component({
  selector: 'app-neighborhood-update',
  templateUrl: './neighborhood-update.component.html',
  styleUrls: ['./neighborhood-update.component.scss']
})
export class NeighborhoodUpdateComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();
  
  public form: FormGroup;
  @Input() dataFromDialog: any;
  private neighbohoodID!: string;
  public showSpinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private neighborhoodSvc: NeighborhoodService,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.form = this.fb.group({
      visible: [null],
      id: [null, Validators.required],
      name: [null, Validators.required]
    }); 
  }
  
  ngOnInit(): void {
    this.neighbohoodID = this.dataFromDialog.id;
    this._setForm();
  }

  private _setForm(): void {
    this.subscriptions.add(
      this.neighborhoodSvc.getByID(this.neighbohoodID)
        .subscribe({
          next: data => {
            this.form.patchValue({
              name: data?.name,
              visible: data?.visible,
              id: this.neighbohoodID
            });
          },
          error: err => this.messageSvc.error(err)
        })
    );
  }

  async onSubmit() {
    if (this.form.valid) {
      this.form.disable();
      this.showSpinner = true;
      const formData = this.form.value;
      
      try {
        const dataToUpdate = this._prepareDataBeforeSend(formData);
        const dataUpdated = await this.neighborhoodSvc.update(dataToUpdate, this.neighbohoodID);

        this.showSpinner = false;
        this.messageSvc.success('Registro actualizado exitosamente');

        /* informa (a neighborhood-admin.ts) 
          que el registro fue actualizado
          y el dialog ha sido cerrado */
        this.dialogRef.close(true); 
      }
      catch (err) { this.messageSvc.error(err); }      
    }
    return;
  }

  private _prepareDataBeforeSend(data: any): Neighborhood {
    let response: Neighborhood = {
      name: data.name,
      visible: data.visible
    };
    return response;
  }  

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}