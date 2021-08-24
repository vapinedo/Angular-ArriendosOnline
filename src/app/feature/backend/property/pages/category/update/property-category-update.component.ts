import { SubSink } from 'subsink';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '@core/services/message.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyCategory } from '@core/interfaces/property-category.interface';
import { PropertyCategoryService } from '@core/services/property-category.service';
import { DialogComponent } from '@shared/backend/components/dialog/dialog.component';

@Component({
  selector: 'app-property-category-update',
  templateUrl: './property-category-update.component.html',
  styleUrls: ['./property-category-update.component.scss']
})
export class PropertyCategoryUpdateComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();
  
  public form: FormGroup;
  @Input() dataFromDialog: any;
  public showSpinner: boolean = false;
  private propertyCategoryID!: string;

  constructor(
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private propertyCategorySvc: PropertyCategoryService
  ) {
    this.form = this.fb.group({
      visible: [null],
      id: [null, Validators.required],
      name: [null, Validators.required]
    }); 
  }
  
  ngOnInit(): void {
    this.propertyCategoryID = this.dataFromDialog.id;
    this._setForm();
  }

  private _setForm(): void {
    this.subscriptions.add(
      this.propertyCategorySvc.readOne(this.propertyCategoryID)
        .subscribe({
          next: data => {
            this.form.patchValue({
              name: data?.name,
              visible: data?.visible,
              id: this.propertyCategoryID
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
        const dataUpdated = await this.propertyCategorySvc.update(dataToUpdate, this.propertyCategoryID);

        this.showSpinner = false;
        this.messageSvc.success('Registro actualizado exitosamente');

        /* informa (a property-category-create-admin.ts) 
          que el registro fue actualizado
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