import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { Info } from 'src/app/models/user';
import {Location} from '@angular/common';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  exampleForm: FormGroup;
  item: Info;
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'image':[
      { type: 'required', message: 'Image URL is required.' },
    ],
    'category':[
      { type: 'required', message: 'Category is required.' },
    ],
    'description':[
      { type: 'required', message: 'Description is required.' },
    ]
  };

  categoryList = [
    'action/adventure', 'art/music', 'biographies',
    'comics', 'cooking', 'crime', 'drama', 'fantasy/SciFi',
    'history', 'horror', 'kids', 'romance', 'science', 'travel', 'other'
  ];
  
  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private _location: Location
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm(this.item);
      }
    })
  }

  createForm(item: Info) {
    this.exampleForm = this.fb.group({
      name: [item.name, Validators.required],
      image: [item.image, Validators.required],
      category: [item.category, Validators.required],
      description: [item.description, Validators.required]
    });
  }

  onSubmit(id: string, value: Info) {
    const user = new Info(value.name, value.image, value.category, value.description);
    user.id = id;

    this.firebaseService.updateUser(user)
      .subscribe(() => {
          this.router.navigate(['/home']);
      });
  }

  delete(id) {
    this.firebaseService.deleteUser(id)
      .subscribe(() => {
          this.router.navigate(['/home']);
      });
  } 
  
  backClicked() {
    this._location.back();
  }  

}
