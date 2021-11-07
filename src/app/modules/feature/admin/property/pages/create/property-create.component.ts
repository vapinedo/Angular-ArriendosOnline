import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { appRoutes } from 'src/environments/environment';
import { FileService } from '@core/services/file.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
  public files: File[] = [];
  public appRoutes: any = appRoutes;
  public isLoading: boolean = false;

  public operationType: any[] = [];
  public neighborhoods$!: Observable<Neighborhood[]>;
  public propertyCategories$!: Observable<PropertyCategory[]>;

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
      description: [null],
      mobileOptional: [null],
      price: [null, []],
      mobile: [null, []],
      address: [null, []],
      category: [null, []],
      active: [false, []],
      neighborhood: [null, []],
      operationType: [null, []]
    }); 
  }
  
  ngOnInit(): void {
    this.neighborhoods$ = this.neighborhoodSvc.getAll();
    this.operationType = this.propertySvc.readOperationType();
    this.propertyCategories$ = this.propertyCategorySvc.getAll();
  }

  onSelectedFiles(files: File[]): void {
    this.files = files;
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid && this.files.length > 0) return;

    this.form.disable();
    this.isLoading = true;
    const formData = this.form.value;
    const uploadFiles = await this.getFilesPromises(this.files);

    try {
      const images = await Promise.all(uploadFiles);
      const newProperty = { ...formData, images };
      const response = await this.propertySvc.create(newProperty);

      this.isLoading = false;
      this.messageSvc.success();
      this.router.navigate([`${this.appRoutes.admin.propiedades}`]);
    }
    catch (err) { console.log(err); }
  }

  getFilesPromises(files: File[]) {
    let promises = files.map(async file => await this.fileSvc.create(file));
    return promises;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}