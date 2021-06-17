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

  public create(property: Property): Promise<any> {
    return this.afs.collection<Property>(this.collectionName).add(property);
  }

  public read(): Observable<any> {
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

  public readOne(id: number): Observable<Property | undefined> {
    return this.afs.doc<Property>(`${this.collectionName}/${id}`)
      .valueChanges();
  }

  public update(property: Property, newFile?: any) {
    return this.afs.collection<Property>(this.collectionName)
      .doc(property.id).update(property);
  }

  public delete(id: string): Promise<void> {
    return this.afs.collection<Property>(this.collectionName)
      .doc(id).delete();
  }

}