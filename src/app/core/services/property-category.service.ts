import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PropertyCategory } from '@core/interfaces/property-category.interface';

@Injectable()
export class PropertyCategoryService {

  private readonly collectionName = 'propiedadCategorias';

  constructor(
    private afs: AngularFirestore,
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

  public readOne(id: string): Observable<any | undefined> {
    return this.afs.doc<PropertyCategory>(`${this.collectionName}/${id}`)
      .valueChanges();
  }

  public update(item: PropertyCategory, id: string) {
    return this.afs.collection<PropertyCategory>(this.collectionName)
      .doc(id).update(item);
  }

  public delete(id: string): Promise<void> {
    return this.afs.collection<PropertyCategory>(this.collectionName)
      .doc(id).delete();
  }

}