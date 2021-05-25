import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Property } from '@core/interfaces/property.interface';

@Injectable()
export class PropertyService {

  private readonly collection = 'properties';

  constructor(
    private afs: AngularFirestore
  ) { }

  public getAll(): Observable<Property[]> {
    return this.afs.collection(this.collection)
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

  public getById(id: number): Observable<Property | undefined> {
    return this.afs.doc<Property>(`${this.collection}/${id}`)
      .valueChanges();
  }

}