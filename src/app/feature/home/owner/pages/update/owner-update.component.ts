import { SubSink } from 'subsink';
import { MatDialogRef } from '@angular/material/dialog';
import { Owner } from '@core/interfaces/owner.interface';
import { OwnerService } from '@core/services/owner.service';
import { MessageService } from '@core/services/message.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from '@shared/components/dialog/dialog.component';

@Component({
  selector: 'app-owner-update',
  templateUrl: './owner-update.component.html',
  styleUrls: ['./owner-update.component.scss']
})
export class OwnerUpdateComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();
  
  public form: FormGroup;
  private ownerID!: string;
  @Input() dataFromDialog: any;
  public showSpinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ownerSvc: OwnerService,
    private messageSvc: MessageService,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      lastname: [null, [Validators.required]]
    }); 
  }
  
  ngOnInit(): void {
    this.ownerID = this.dataFromDialog.id;
    this._setForm();
  }

  private _setForm(): void {
    this.subscriptions.add(
      this.ownerSvc.readOne(this.ownerID)
        .subscribe({
          next: data => {
            this.form.patchValue({
              id: this.ownerID,
              name: data?.name,
              mobile: data?.mobile,
              lastname: data?.lastname
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
        const dataUpdated = await this.ownerSvc.update(dataToUpdate, this.ownerID);

        this.showSpinner = false;
        this.messageSvc.success('Registro actualizado exitosamente');

        /* informa (a owner-admin.ts) 
          que el registro fue actualizado
          y el dialog ha sido cerrado */
        this.dialogRef.close(true); 
      }
      catch (err) { 
        console.log(err); 
        this.messageSvc.error(err); 
      }      
    }
    return;
  }

  private _prepareDataBeforeSend(data: any): Owner {
    let response: Owner = {
      name: data.name,
      mobile: data.mobile,
      lastname: data.lastname
    };
    return response;
  }  

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}