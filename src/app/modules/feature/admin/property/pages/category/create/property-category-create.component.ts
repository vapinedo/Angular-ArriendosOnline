import { SubSink } from 'subsink';
import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '@core/services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyCategory } from '@core/interfaces/property-category.interface';
import { PropertyCategoryService } from '@core/services/property-category.service';
import { DialogComponent } from '@shared/admin/components/dialog/dialog.component';

@Component({
  selector: 'app-property-category-create',
  templateUrl: './property-category-create.component.html',
  styleUrls: ['./property-category-create.component.scss']
})
export class PropertyCategoryCreateComponent implements OnDestroy {

  private subscriptions = new SubSink();

  public form: FormGroup;
  public showSpinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private propertyCategorySvc: PropertyCategoryService
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
        const dataCreated = await this.propertyCategorySvc.create(newData);

        this.showSpinner = false;
        this.messageSvc.success();

        /* informa (a property-category-admin.ts) 
          que el registro fue creado
          y el dialog ha sido cerrado */
        this.dialogRef.close(true); 
      }
      catch (err) { this.messageSvc.error(err); }      
    }
    return;
  }

  private _prepareDataBeforeSend(data: any): PropertyCategory {
    let response: PropertyCategory = {
      name: data.name,
      visible: data.visible
    };
    return response;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}