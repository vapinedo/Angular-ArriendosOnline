import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { MessageService } from '@core/services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    ) {
      this.form = this.fb.group({
        user: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }); 
    }

  onLogin() {
    if (this.form.valid) {
      const { user, password } = this.form.value;
      console.log(user, password);
    }
    return;
  }

}