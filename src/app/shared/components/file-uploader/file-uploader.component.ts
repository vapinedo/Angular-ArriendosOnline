import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '@core/services/message.service';
import { AngularFireStorage, AngularFireUploadTask  } from '@angular/fire/storage';   //   import <<<<

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  constructor(
    private messageSvc: MessageService,
    private storage: AngularFireStorage
  ) { }

  public task!: AngularFireUploadTask;              
  public imgPreviewUrls: string[] = [];
  public downloadableURLs: string[] = [];                      
  public isInvalidFormats: boolean = false;
  public progressValue!: Observable<number | undefined>;

  public readonly basePath = '/propiedades';                       
  public readonly allowedFormats = '.jpeg,.jpg,.png,.svg';
  private readonly validFormats: string[] = ['image/jpeg', 'image/png'];

  ngOnInit(): void {}
  
  async onFileChange(event: any) {
    const files = event.target.files;
    
    if (files && this._filesAreOnlyImages(files)) {
      this._generateImgPreview(files);

      for (let i=0; i<files.length; i++) {
        const filePath = `${this.basePath}/${files[i].name}`;  
        this.task =  this.storage.upload(filePath, files[i]);

        (await this.task).ref.getDownloadURL()
          .then(url => {
            this.downloadableURLs.push(url); 
          })
          .catch(error => this.messageSvc.error(error));
      }
      // this.progressValue = this.task.percentageChanges();
    } else {  
      this.downloadableURLs = []; 
      this.isInvalidFormats = true;
    }
  }

  private _generateImgPreview(files: any): void {
    for(let i=0; i<files.length; i++) { 
      const reader = new FileReader();
      reader.onload = () => this.imgPreviewUrls.push(reader.result as string);
      reader.readAsDataURL(files[i]);
    }
  }
  
  private _filesAreOnlyImages(files: any): boolean {
    for(let i=0; i<files.length; i++) {
      const format = files[i].type;
      if (!this.validFormats.includes(format)) {
        return false;
      }
    }
    return true;
  }

}