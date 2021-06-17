import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '@core/services/message.service';
import { PropertyService } from '@core/services/property.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.scss']
})
export class PropertyEditComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();

  public images: any;
  public propertyID: any;
  public form: FormGroup;
  public imageUrls: string[] = [];
  public title = 'Actualizar Propiedad';

  constructor(
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private propertySvc: PropertyService,
    private activatedRoute: ActivatedRoute
  ) {
    this.propertyID = activatedRoute.snapshot.paramMap.get('id');

    this.form = this.fb.group({
      id: [null, Validators.required],
      img: [null, Validators.required],
      type: [null, [Validators.required]],
      price: [null, [Validators.required]]
    }); 
  }

  ngOnInit(): void {
    this._setForm();
  }

  private _setForm(): void {
    this.subscriptions.add(
      this.propertySvc.getOne(this.propertyID)
        .subscribe({
          next: data => {
            this.form.patchValue({
              img: data?.img,
              type: data?.type,
              price: data?.price,
              id: this.propertyID
            });
          },
          error: err => this.messageSvc.error(err)
        })
    );
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
      const property = this.form.value;
      this.propertySvc.update(property, image);
    }
    return;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}