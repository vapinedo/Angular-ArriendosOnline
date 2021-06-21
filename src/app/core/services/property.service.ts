import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Property } from '@core/interfaces/property.interface';

@Injectable()
export class PropertyService {

  private readonly collectionName = 'propiedades';

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  public create(item: Property): Promise<any> {
    return this.afs.collection<Property>(this.collectionName).add(item);
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

  public update(item: Property, newFile?: any) {
    return this.afs.collection<Property>(this.collectionName)
      .doc(item.id).update(item);
  }

  public delete(id: string): Promise<void> {
    return this.afs.collection<Property>(this.collectionName)
      .doc(id).delete();
  }

}