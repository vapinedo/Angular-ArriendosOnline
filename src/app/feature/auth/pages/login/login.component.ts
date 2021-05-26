import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { MessageService } from '@core/services/message.service';
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
  public subscriptions = new Subscription();
  
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

  onLogin() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authSvc.loginByEmail(email, password)
        .then(data => {
          this.router.navigate(['/home/propiedades']);
        })
        .catch(error => console.log('Error', error));
    }
    return;
  }

}