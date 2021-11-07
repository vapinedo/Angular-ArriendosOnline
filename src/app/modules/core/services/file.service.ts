import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask  } from '@angular/fire/storage';

@Injectable()
export class FileService {

  public task!: AngularFireUploadTask;              
  public isInvalidFormats: boolean = false;
  public progressValue!: Observable<number | undefined>;

  public readonly basePath = '/propiedades';                       
  public readonly allowedFormats = '.jpeg,.jpg,.png,.svg';
  private readonly validFormats: string[] = ['image/jpeg', 'image/png'];

  constructor(
    private storage: AngularFireStorage
  ) {}

  public async create(file: any): Promise<any> {
    if (file && this._fileIsOnlyImage(file)) {
      const filePath = `${this.basePath}/${file.name}`; 
      const task =  this.storage.upload(filePath, file);
      const response = (await task).ref.getDownloadURL();
      return response;
    }
    return;
  }

  public delete(downloadUrl: string): Promise<any> {
    return this.storage.refFromURL(downloadUrl).delete().toPromise();    
  }
  
  private _fileIsOnlyImage(file: any): boolean {
    const format = file.type;
    return (this.validFormats.includes(format)) ? true : false;
  }
}