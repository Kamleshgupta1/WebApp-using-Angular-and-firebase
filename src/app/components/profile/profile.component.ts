import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { User } from  'firebase';
import { Router } from "@angular/router";
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

user: User;

 constructor(@Inject(LOCAL_STORAGE) private localStorage: any, public  afAuth:  AngularFireAuth, public  router:  Router) { 
  
      this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
 }
  ngOnInit() {
  }
  
  async  login(email:  string, password:  string) {

    try {
        await  this.afAuth.auth.signInWithEmailAndPassword(email, password)
        this.router.navigate(['/home']);
    } catch (e) {
        alert("Error!"  +  e.message);
    }
  }

  async register(email: string, password: string) {
    var result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
   // this.sendEmailVerification();
  }

  logingoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  
  loginfb() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }
  
  logout() {
    this.afAuth.auth.signOut();
    this.localStorage.removeItem('user');
    this.router.navigate(['/profile']);
  }

}
