import { SubSink } from 'subsink';
import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Owner } from '@core/interfaces/owner.interface';
import { OwnerService } from '@core/services/owner.service';
import { MessageService } from '@core/services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from '@shared/backend/components/dialog/dialog.component';

@Component({
  selector: 'app-owner-create',
  templateUrl: './owner-create.component.html',
  styleUrls: ['./owner-create.component.scss']
})
export class OwnerCreateComponent implements OnDestroy {

  private subscriptions = new SubSink();

  public form: FormGroup;
  public showSpinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ownerSvc: OwnerService,
    private messageSvc: MessageService,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.form = this.fb.group({
      mobileOptional: [null],
      name: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      lastname: [null, [Validators.required]]
    }); 
  }

  async onSubmit() {
    if (this.form.valid) {
      this.form.disable();
      this.showSpinner = true;
      const formData = this.form.value;
      
      try {
        const newData = this._prepareDataBeforeSend(formData);
        const dataCreated = await this.ownerSvc.create(newData);

        this.showSpinner = false;
        this.messageSvc.success();

        /* informa (a owner-admin.ts) 
          que el registro fue creado
          y el dialog ha sido cerrado */
        this.dialogRef.close(true); 
      }
      catch (err) { this.messageSvc.error(err); }      
    }
    return;
  }

  private _prepareDataBeforeSend(data: any): Owner {
    let response: Owner = {
      name: data.name,
      mobile: data.mobile,
      lastname: data.lastname,
      mobileOptional: data.mobileOptional
    };
    return response;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}