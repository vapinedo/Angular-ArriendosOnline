import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { FileService } from '@core/services/file.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Property } from '@core/interfaces/property.interface';
import { MessageService } from '@core/services/message.service';
import { PropertyService } from '@core/services/property.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Neighborhood } from '@core/interfaces/neighborhood.interface';
import { NeighborhoodService } from '@core/services/neighborhood.service';
import { PropertyCategory } from '@core/interfaces/property-category.interface';
import { PropertyCategoryService } from '@core/services/property-category.service';

@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.scss']
})
export class PropertyCreateComponent implements OnDestroy, OnInit {

  public masks = {
    mobile: '(000) 000 0000'
  }
  private subscriptions = new SubSink();

  public form: FormGroup;
  private files: any[] = [];
  public title = 'Nueva Propiedad';
  public showSpinner: boolean = false;

  public imgPreviewUrls: any[] = [];
  public showImagesPreview: boolean = false;
  public defaultImage: string = '../../../../../../assets/img/img_placeholder.jpg';
  
  public operationType: any[] = [];
  public neighborhoods$!: Observable<Neighborhood[]>;
  public propertyCategories$!: Observable<PropertyCategory[]>;

  public isInvalidFormats: boolean = false;
  public readonly allowedFormats = '.jpeg,.jpg,.png,.svg';
  private readonly validFormats: string[] = ['image/jpeg', 'image/png'];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private fileSvc: FileService,
    private messageSvc: MessageService,
    private propertySvc: PropertyService,
    private neighborhoodSvc: NeighborhoodService,
    private propertyCategorySvc: PropertyCategoryService
    ) {
      this.form = this.fb.group({
      visible: [false],
      description: [null],
      mobileOptional: [null],
      price: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      address: [null, [Validators.required]],
      category: [null, [Validators.required]],
      images: [false, [Validators.requiredTrue]],
      neighborhood: [null, [Validators.required]],
      operationType: [null, [Validators.required]]
    }); 
  }
  
  ngOnInit(): void {
    this.neighborhoods$ = this.neighborhoodSvc.read();
    this.operationType = this.propertySvc.readOperationType();
    this.propertyCategories$ = this.propertyCategorySvc.read();
  }

  onFileChange(event: any): void {
    const tempFiles = event.target.files;
    
    if (tempFiles) {
      for (const file of tempFiles) {
        this.files.push(file);
      }
        
      if (this._filesAreOnlyImages(tempFiles)) {
        this._generateImgPreview(tempFiles);
        this.form.controls.images.patchValue(true);
      } 
      else {
        this.isInvalidFormats = true;
        this.form.controls.images.patchValue(false);
      }
    }
  }

  onFeatureImage(imageIndex: number): void {
    const featureImageOnFiles = this.files.splice(imageIndex, 1);
    const featureImageOnPreviewUrls = this.imgPreviewUrls.splice(imageIndex, 1);

    this.files.unshift(featureImageOnFiles[0]);
    this.imgPreviewUrls.unshift(featureImageOnPreviewUrls[0]);
  }
  
  onDeleteImage(imageIndex: number): void {
    if (this.files.length === 1 ) {
      this.form.controls.images.patchValue(false);
    } 
    this.files.splice(imageIndex, 1);
    this.imgPreviewUrls.splice(imageIndex, 1);
  }

  private _generateImgPreview(files: FileList): void {
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

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.form.disable();
      this.showSpinner = true;
      const formData = this.form.value;

      try {
        let promises: any[] = [];
        for (let i=0; i<this.files.length; i++) {
          const file = this.files[i];
          const promise = await this.fileSvc.create(file);
          promises.push(promise);
        }
        const filesURL = await Promise.all(promises);
        const newData = this._prepareDataBeforeSend(formData, filesURL);
        const dataCreated = await this.propertySvc.create(newData);

        this.showSpinner = false;
        this.messageSvc.success();
        this.router.navigate(['/admin/propiedades']);
      }
      catch (err) { this.messageSvc.error(err); }
    }
    return;
  }

  private _prepareDataBeforeSend(data: any, filesURL: string[]): Property {
    let response: Property = {
      images: filesURL,
      price: data.price,
      mobile: data.mobile,
      address: data.address,
      visible: data.visible,
      category: data.category,
      description: data.description,
      neighborhood: data.neighborhood,
      operationType: data.operationType,
      mobileOptional: data.mobileOptional
    };
    return response;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}