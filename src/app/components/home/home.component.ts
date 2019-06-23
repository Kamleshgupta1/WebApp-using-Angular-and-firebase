import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from '../../services/firebase.service';
import { Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchValue: string = "";
  items: Observable<Array<any>> = this.firebaseService.users$;

  constructor(@Inject(WINDOW) private window: Window, 
    public firebaseService: FirebaseService,
    private router: Router,
    public afAuth:  AngularFireAuth
  ) { }
 
  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getUsers()
  }
  
  editDetails(id: number){
    this.router.navigate(['/edit/'+ id])
  }
  
  /*
  editDetails(id: number){
    if(this.authService.isLoggedIn !== true) {
      window.alert('Access Denied, Login is Required to Access This Page!')
    }
    this.router.navigate(['/edit/'+ id])
  }
  */
  
  viewDetails(id: number){
    this.router.navigate(['/details/'+ id])
  }

  searchByName(value){
    this.firebaseService.filter({ name: 'name', value });
  }

}
