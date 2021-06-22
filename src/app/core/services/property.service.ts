import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Property } from '@core/interfaces/property.interface';

@Injectable()
export class PropertyService {

  private readonly collectionName = 'propiedades';

  constructor(
    private afs: AngularFirestore
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
            const payload = item.payload.doc.data() as object; 
            return { id, ...payload };
          })
        )
      );
  }

  public readOne(id: string): Observable<Property | undefined> {
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

  /*
    HARDCODED METHODS
  */
  public readOperationType(): any[] {
    const response = [
      { key: 'En Venta', value: 'venta' },
      { key: 'En Arriendo', value: 'arriendo' }
    ];
    return response;
  }

}