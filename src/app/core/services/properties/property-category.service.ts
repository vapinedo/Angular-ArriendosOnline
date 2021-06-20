import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Property } from '@core/interfaces/prroperty/property.interface';
import { PropertyCategory } from '@core/interfaces/prroperty/property-category.interface';

@Injectable()
export class PropertyCategoryService {

  private readonly collectionName = 'propiedadCategorias';

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  public create(item: PropertyCategory): Promise<any> {
    return this.afs.collection<PropertyCategory>(this.collectionName).add(item);
  }

  public read(): Observable<any> {
    return this.afs.collection<PropertyCategory>(this.collectionName)
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

  public readOne(id: number): Observable<PropertyCategory | undefined> {
    return this.afs.doc<PropertyCategory>(`${this.collectionName}/${id}`)
      .valueChanges();
  }

  public update(item: PropertyCategory, newFile?: any) {
    return this.afs.collection<PropertyCategory>(this.collectionName)
      .doc(item.id).update(item);
  }

  public delete(id: string): Promise<void> {
    return this.afs.collection<Property>(this.collectionName)
      .doc(id).delete();
  }

}