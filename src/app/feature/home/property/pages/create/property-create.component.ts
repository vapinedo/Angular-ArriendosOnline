import { SubSink } from 'subsink';
import { finalize } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Property } from '@core/interfaces/property.interface';
import { MessageService } from '@core/services/message.service';
import { PropertyService } from '@core/services/property.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.scss']
})
export class PropertyCreateComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();

  public image: any;
  public images: any;
  public form: FormGroup;
  public imageUrls: string[] = [];
  public title = 'Propiedad Crear';

  constructor(
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private propertySvc: PropertyService
  ) {
    this.form = this.fb.group({
      img: [null],
      type: [null, [Validators.required]],
      price: [null, [Validators.required]]
    }); 
  }

  ngOnInit(): void {
  }

  onSelectImage(event: any): void {
    if (event.target.files) {
      const images = event.target.files;
      this.images = images;

      for (let i=0; i<images.length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(images[i]);

        reader.onload = (events:any) => {
          this.imageUrls.push(events.target.result);  
        }
      }
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const image = this.images[0];
      const property: Property = this._prepareDataBeforeSend(this.form.value);

      this.propertySvc.fileUpload(property, image)
        // .subscribe({
        //   next: data => console.log('Create property', data),
        //   error: err => console.log('Error', err),
        //   complete: () => console.log('Create property complete')
        // })
    }
    return;
  }

  private _prepareDataBeforeSend(data: any): Property {
    let response: Property = {
      type: data.type,
      price: data.price,
    };
    return response;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}