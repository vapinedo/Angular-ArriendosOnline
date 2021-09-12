import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, filter, tap } from 'rxjs/operators';
import { Filter } from '@core/interfaces/filter.interface';
import { Property } from '@core/interfaces/property.interface';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';

@Injectable()
export class PropertyService {

  private readonly collectionName = 'propiedades';

  constructor(
    private afs: AngularFirestore
  ) {}

  public create(item: Property): Promise<DocumentReference<Property>> {
    return this.afs.collection<Property>(this.collectionName).add(item);
  }

  public getAll(filter?: Filter) {
    const properties$ = this.afs.collection<Property>(this.collectionName)
      .snapshotChanges()
      .pipe(
        map((data: DocumentChangeAction<Property>[]) => this.getPayloadWith(data, filter)),
        map(data => this.filterBy(data, filter)),
      );
    return properties$;
  }

  getPayloadWith(data: DocumentChangeAction<Property>[], filter?: Filter) {
    return data.map(item => {
      const id = item.payload.doc.id;
      const payload = item.payload.doc.data();
      return { id, ...payload };
    })
  }

  filterBy(data: any, filter?: Filter) {
    if (filter?.category && filter.neighborhood) {
      return data.filter((item: Property) => {
        return item.category === filter.category && item.neighborhood === filter.neighborhood;
      });
    } 
    else if (filter?.category) {
      return data.filter((item: Property) => item.category === filter.category);
    } 
    else if (filter?.neighborhood) {
      return data.filter((item: Property) => item.neighborhood === filter.neighborhood);
    } 
    return data.filter((item: Property) => item);
  }

  public getByID(id: string): Observable<Property | undefined> {
    return this.afs.doc<Property>(`${this.collectionName}/${id}`)
    .valueChanges();
  }

  public update(item: Property, newFile?: any): Promise<void> {
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