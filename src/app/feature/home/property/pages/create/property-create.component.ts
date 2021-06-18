import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Property } from '@core/interfaces/property.interface';
import { MessageService } from '@core/services/message.service';
import { PropertyService } from '@core/services/property.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileuploaderService } from '@core/services/fileuploader.service';

@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.scss']
})
export class PropertyCreateComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();

  public form: FormGroup;
  private files: any = null;
  public imageUrls: string[] = [];
  public title = 'Propiedad Crear';
  public showSpinner: boolean = false;
  public imgPreviewUrls: string[] = [];

  public isInvalidFormats: boolean = false;
  public readonly allowedFormats = '.jpeg,.jpg,.png,.svg';
  private readonly validFormats: string[] = ['image/jpeg', 'image/png'];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private propertySvc: PropertyService,
    private fileuploaderSvc: FileuploaderService
  ) {
    this.form = this.fb.group({
      price: [null, [Validators.required]],
      images: [null, [Validators.required]],
      category: [null, [Validators.required]]
    }); 
  }

  ngOnInit(): void {
  }

  onFileChange(event: any): void {
    this.files = event.target.files;
    
    if (this.files && this._filesAreOnlyImages(this.files)) {
      this._generateImgPreview(this.files);
      this.form.controls.images.setValue('text');
    } else {  
      this.files = null;
      this.isInvalidFormats = true;
    }
  }

  private _generateImgPreview(files: any): void {
    for(let i=0; i<files.length; i++) { 
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => this.imgPreviewUrls.push(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  private _filesAreOnlyImages(files: any): boolean {
    for(let i=0; i<files.length; i++) {
      const format = files[i].type;
      if (!this.validFormats.includes(format)) {
        return false;
      }
    }
    return true;
  }

  async onSubmit() {
    if (this.form.valid) {
      this.form.disable();
      this.showSpinner = true;
      const formData = this.form.value;

      try {
        let promises: any[] = [];
        for (let i=0; i<this.files.length; i++) {
          const promise = await this.fileuploaderSvc.upload(this.files[i]);
          promises.push(promise);
        }
        const filesURL = await Promise.all(promises);
        const newProperty = this._prepareDataBeforeSend(formData, filesURL);
        const propertyCreated = await this.propertySvc.create(newProperty);

        this.showSpinner = false;
        this.router.navigate(['/home/propiedades']);
        
        this.messageSvc.success();
      }
      catch (err) {
        console.log('ERROR', err);
      }
    }
    return;
  }

  private _prepareDataBeforeSend(data: any, filesURL: string[]): Property {
    let property: Property = {
      images: filesURL,
      price: data.price,
      category: data.category,
    };
    return property;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}