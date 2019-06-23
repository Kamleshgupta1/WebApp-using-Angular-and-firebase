import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Info } from 'src/app/models/user';


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  exampleForm: FormGroup;
  item: Info;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public afAuth:  AngularFireAuth
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
      }
    })
  }

  editDetails(id: number){
    this.router.navigate(['/edit/'+ id])
  }

}
