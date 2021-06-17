import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Property } from '@core/interfaces/property.interface';
import { FileUpload } from '@core/interfaces/file-upload.interface';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

@Injectable()
export class PropertyService {

  private filePath: any;
  private readonly assetsFolder = 'propiedades';
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

  public update(property: Property, newFile?: any) {
    if (newFile) {
      return this.fileUpload(property, newFile);
    } else {
      return this.afs.collection<Property>(this.collectionName)
        .doc(property.id).update(property);
    }
  }

  public fileUpload(property: Property, file: any) {
    this.filePath = `${this.assetsFolder}/${file.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, file);

    return task.snapshotChanges()    
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(downloadURL => {
            property.img = downloadURL;
            // this._create(property);
            return downloadURL;
          })
        })
      );

    // return task.snapshotChanges()    
    //   .pipe(
    //     finalize(() => {
    //       fileRef.getDownloadURL().subscribe(downloadURL => {
    //         property.img = downloadURL;
    //         // this._create(property);
    //         return downloadURL;
    //       })
    //     })
    //   );
  }

  private _create(property: Property) {
    console.log('CREATE', property);
    // const property: Property = {
    //   type: item.type,
    //   price: item.price,
    //   imgRef: this.filePath
    // };

    // if (property.id) {
    //   return this.afs.collection<Property>(this.collectionName)
    //     .doc(item.id).update(property);
    // } else {
    //   return this.afs.collection<Property>(this.collectionName).add(property);
    // }
  }

}