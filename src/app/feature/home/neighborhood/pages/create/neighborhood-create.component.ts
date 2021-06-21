import { SubSink } from 'subsink';
import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '@core/services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Neighborhood } from '@core/interfaces/neighborhood.interface';
import { NeighborhoodService } from '@core/services/neighborhood.service';
import { DialogComponent } from '@shared/components/dialog/dialog.component';

@Component({
  selector: 'app-neighborhood-create',
  templateUrl: './neighborhood-create.component.html',
  styleUrls: ['./neighborhood-create.component.scss']
})
export class NeighborhoodCreateComponent implements OnDestroy {

  private subscriptions = new SubSink();

  public form: FormGroup;
  public showSpinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private neighborhoodSvc: NeighborhoodService,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.form = this.fb.group({
      visible: [false],
      name: [null, [Validators.required]]
    }); 
  }

  async onSubmit() {
    if (this.form.valid) {
      this.form.disable();
      this.showSpinner = true;
      const formData = this.form.value;
      
      try {
        const newData = this._prepareDataBeforeSend(formData);
        const dataCreated = await this.neighborhoodSvc.create(newData);

        this.showSpinner = false;
        this.messageSvc.success();

        /* informa (a property-create-admin.ts) 
          que el registro fue creado
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