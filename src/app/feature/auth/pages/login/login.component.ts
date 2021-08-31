import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { appRoutes } from 'src/environments/environment';
import { AuthService } from '@core/services/auth.service';
import { MessageService } from '@core/services/message.service';
import { LoginData } from '@core/interfaces/login-data.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '@core/services/validators.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form: FormGroup;
  public authError = false;
  public title = 'Arriendos Online';
  public appRoutes: any = appRoutes;
  public showSpinner: boolean = false;
  
  constructor( 
    private router: Router,
    private fb: FormBuilder,
    private authSvc: AuthService,
    private messageSvc: MessageService,
    private validatorsSvc: ValidatorsService,
  ) {
    this.form = this.fb.group({
      email: [null, [
        Validators.required,
        Validators.pattern(this.validatorsSvc.VALID_EMAIL_STRING)
      ]],
      password: [null, [Validators.required]]
    }); 
  }

  async onSubmit() {
    if (this.form.valid) {
      this.showSpinner = true;
      const formData = this.form.value;

      try {
        const newData = this._prepareDataBeforeSend(formData);
        const response = await this.authSvc.loginByEmail(newData);

        this.showSpinner = false;
        this.router.navigate([`${this.appRoutes.admin.propiedades}`]);
      }
      catch (err) { this.messageSvc.error(err); }            
    }
    return;
  }

  private _prepareDataBeforeSend(data: any): LoginData {
    let response: LoginData = {
      email: data.email,
      password: data.password
    };
    return response;
  }

}