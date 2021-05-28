import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {

  public userData: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth
  ) { 
    this.userData = afAuth.authState;
  }

  public loginByEmail(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  public logout(): Promise<void> {
    return this.afAuth.signOut();
  }

}