import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PropertyCategoryNew } from '@core/interfaces/property-category/property-category-new.interface';
import { PropertyCategoryUpdate } from '@core/interfaces/property-category/property-category-update.interface';

@Injectable()
export class PropertyCategoryService {

  private readonly collectionName = 'propiedadCategorias';

  constructor(
    private afs: AngularFirestore,
  ) {}

  public create(item: PropertyCategoryNew): Promise<any> {
    return this.afs.collection<any>(this.collectionName).add(item);
  }

  public read(): Observable<any> {
    return this.afs.collection<any>(this.collectionName)
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

  public readOne(id: number): Observable<any | undefined> {
    return this.afs.doc<any>(`${this.collectionName}/${id}`)
      .valueChanges();
  }

  public update(item: PropertyCategoryUpdate) {
    return this.afs.collection<any>(this.collectionName)
      .doc(item.id).update(item);
  }

  public delete(id: string): Promise<void> {
    return this.afs.collection<any>(this.collectionName)
      .doc(id).delete();
  }

}