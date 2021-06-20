import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '@core/services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyCategory } from '@core/interfaces/prroperty/property-category.interface';
import { PropertyCategoryService } from '@core/services/properties/property-category.service';
import { DialogComponent } from '@shared/components/dialog/dialog.component';

@Component({
  selector: 'app-property-category-create',
  templateUrl: './property-category-create.component.html',
  styleUrls: ['./property-category-create.component.scss']
})
export class PropertyCategoryCreateComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();

  public form: FormGroup;
  public showSpinner: boolean = false;
  public title = 'Crear categoría de propiedad';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private propertyCategorySvc: PropertyCategoryService,
  ) {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      visible: [false, [Validators.requiredTrue]]
    }); 
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    if (this.form.valid) {
      this.form.disable();
      this.showSpinner = true;
      const formData = this.form.value;
      
      try {
        const newPropertyCategory = this._prepareDataBeforeSend(formData);
        const propertyCategoryCreated = await this.propertyCategorySvc.create(newPropertyCategory);

        this.showSpinner = false;
        this.router.navigate(['/home/propiedad-categorias']);
        this.messageSvc.success();

        /* informa (a property-create-admin.ts) 
          que la el registro se creo exitosamente
          y el dialog ha sido cerrado */
        this.dialogRef.close(true); 
      }
      catch (err) { this.messageSvc.error(err); }      
    }
    return;
  }

  private _prepareDataBeforeSend(data: any): PropertyCategory {
    let propertyCategory: PropertyCategory = {
      name: data.name,
      visible: data.visible
    };
    return propertyCategory;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}