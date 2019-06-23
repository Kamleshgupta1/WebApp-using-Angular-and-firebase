import { Injectable, NgZone, Inject } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';

@Injectable()
export class AuthService {
  userData: any;

  constructor(@Inject(WINDOW) private window: Window, @Inject(LOCAL_STORAGE) private localStorage: any, 
    public afAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {    
    // Setting logged in user in localstorage else null
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['user-profile']);
        })
    }).catch((error) => {
      this.window.alert(error)
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

}