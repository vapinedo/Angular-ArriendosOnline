import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Property } from '@core/interfaces/property.interface';
import { FileUpload } from '@core/interfaces/file-upload.interface';

@Injectable()
export class PropertyService {

  private filePath: any;
  private assetsFolder = 'propiedades';
  private downloadURL!: Observable<string>;
  private readonly collectionName = 'propiedades';

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  public getAll(): Observable<Property[]> {
    return this.afs.collection<Property>(this.collectionName)
      .snapshotChanges()
      .pipe(
        map(data => 
          data.map(item => {
            const id = item.payload.doc.id;
            const property = item.payload.doc.data() as object; 
            return { id, ...property };
          })
        )
      );
  }

  public getOne(id: number): Observable<Property | undefined> {
    return this.afs.doc<Property>(`${this.collectionName}/${id}`)
      .valueChanges();
  }

  public delete(id: string): Promise<void> {
    return this.afs.collection<Property>(this.collectionName)
      .doc(id).delete();
  }

  public update(item: Property): Promise<void> {
    return this.afs.collection<Property>(this.collectionName)
      .doc(item.id).update(item);
  }

  // public beforeCreateAndUpdate(property: Property, file: any): void {
  //   this._fileUpload(property, file);
  // }

  public fileUpload(property: Property, file: any) {
    this.filePath = `${this.assetsFolder}/${file.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, file);

    return task.snapshotChanges()    
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(downloadURL => {
            this.downloadURL = downloadURL;
            this._create(property);
          })
        })
      );
  }

  private _create(item: Property): void {
    const property: Property = {
      type: item.type,
      price: item.price,
      img: this.downloadURL,
      imgRef: this.filePath
    };
    this.afs.collection<Property>(this.collectionName).add(property);
  }

}