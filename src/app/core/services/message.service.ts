import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';

@Injectable()
export class MessageService {

  constructor(private toastr: ToastrService) { }

  success(message: string): ActiveToast<any> {
    return this.toastr.success(message);
  }

  error(message: string): ActiveToast<any> {
    return this.toastr.error(message);
  }

}

