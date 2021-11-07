import { Component, Output, EventEmitter } from '@angular/core';
import { HelpersService } from '@core/services/helpers.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {

  @Output() selectedFiles = new EventEmitter <File[]>();

  public assetsUrl: string;
  public files: File[] = [];
  public filesUrlOnBase64: string[] = [];
  public defaultImage: string = '/img/img_placeholder.jpg';
  public readonly allowedFormats: string = '.jpeg, .jpg, .png';

  constructor(private helpersSvc: HelpersService) {
    this.assetsUrl = helpersSvc.assetsUrl();
  }

  onSelectFiles(event: any): void {
    // when no files were selected
    if (!event.target.files) return;

    const fileList: FileList = event.target.files;
    const fileArray = Array.from(fileList);

    this.files = this.getOnlyImage(fileArray);
    this.filesUrlOnBase64 = this.getBase64File(this.files);
    this.selectedFiles.emit(this.files);
  }

  getOnlyImage(files: File[]): File[] {
    const validFormats = ['image/png', 'image/jpeg', 'image/jpg'];
    const filesOnlyImages = files.filter((file: File) => {
      return validFormats.includes(file.type);
    });
    return filesOnlyImages;
  }

  getBase64File(files: File[]): string[] {
    const base64Files: string[] = [];
    for(let i=0; i<files.length; i++) { 
      const fileReader = new FileReader();
      fileReader.onload = () => base64Files.push(fileReader.result as string);
      fileReader.readAsDataURL(files[i]);
    }
    return base64Files;
  }

  onFeatureImage(imgIndex: number): void {
    const featureImage = this.filesUrlOnBase64.splice(imgIndex, 1);
    if (featureImage.length > 0) {
      this.filesUrlOnBase64.unshift(featureImage[0]);
    }
  }
  
  onDeleteImage(imgIndex: number): void {
    this.files.splice(imgIndex, 1);
    this.filesUrlOnBase64.splice(imgIndex, 1);
    this.selectedFiles.emit(this.files);   
  }

}