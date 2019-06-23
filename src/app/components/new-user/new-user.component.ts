import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import {BehaviorSubject} from 'rxjs';

import { Info } from 'src/app/models/user';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  exampleForm: FormGroup;
  image: string = '';

  validation_messages = {
    'name': [
      { type: 'required', message: 'Title is required.' }
    ],
    'auther': [
      { type: 'required', message: 'Auther name is required.' },
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
  
  addBookForm: FormGroup;
  categoryList = [
    'action/adventure', 'art/music', 'biographies',
    'comics', 'cooking', 'crime', 'drama', 'fantasy/SciFi',
    'history', 'horror', 'kids', 'romance', 'science', 'travel', 'other'
  ];

  bookEdited = new BehaviorSubject<any>({});
  book = new ReactiveBook();
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public firebaseService: FirebaseService,
  ) { }

   ngOnInit() {
   this.createForm();
   
    this.addBookForm = new FormGroup({
      bookDescriptionDetail: new FormArray([new FormControl(null, Validators.required)])
    });
    this.bookEdited.subscribe(editedBook => {
      if (editedBook.descriptionDetail) {
        const arr = <FormArray>this.addBookForm.get('bookDescriptionDetail');
        arr.removeAt(0);
        for (let i = 0; i < editedBook.descriptionDetail.length; i++) {
          arr.push(new FormControl(editedBook.descriptionDetail[i], Validators.required));
        }
      }
    });
  }

  newParagraph() {
    const arr = <FormArray>this.addBookForm.get('bookDescriptionDetail');
    arr.push(new FormControl(null, Validators.required));
  }
  
  removeDetailPos(index: number ){
    const arr = <FormArray>this.addBookForm.get('bookDescriptionDetail');
    arr.removeAt(index);
  }
  
  createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required],
      auther: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(value: Info) {
    this.firebaseService.createUser(value)
      .subscribe(() => {
          this.router.navigate(['/home']);
      });
  }

}

class ReactiveBook {
  constructor(
    public descriptionDetail?: Array<string>
  ) {
  }
}




/*
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import {BehaviorSubject} from 'rxjs';

import { User } from 'src/app/models/user';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  exampleForm: FormGroup;
  image: string = '';

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'age': [
      { type: 'required', message: 'Age is required.' },
    ],
    'image':[
      { type: 'required', message: 'Image URL is required.' },
    ]
  };
  
  addBookForm: FormGroup;
  categoryList = [
    'action/adventure', 'art/music', 'biographies',
    'comics', 'cooking', 'crime', 'drama', 'fantasy/SciFi',
    'history', 'horror', 'kids', 'romance', 'science', 'travel', 'other'
  ];

  bookEdited = new BehaviorSubject<any>({});
  book = new ReactiveBook();
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public firebaseService: FirebaseService,
  ) { }

   ngOnInit() {
   this.createForm();
   
    this.addBookForm = new FormGroup({
      bookDescriptionDetail: new FormArray([new FormControl(null, Validators.required)])
    });
    this.bookEdited.subscribe(editedBook => {
      if (editedBook.descriptionDetail) {
        const arr = <FormArray>this.addBookForm.get('bookDescriptionDetail');
        arr.removeAt(0);
        for (let i = 0; i < editedBook.descriptionDetail.length; i++) {
          arr.push(new FormControl(editedBook.descriptionDetail[i], Validators.required));
        }
      }
    });
  }

  newParagraph() {
    const arr = <FormArray>this.addBookForm.get('bookDescriptionDetail');
    arr.push(new FormControl(null, Validators.required));
  }
  
  removeDetailPos(index: number ){
    const arr = <FormArray>this.addBookForm.get('bookDescriptionDetail');
    arr.removeAt(index);
  }
  
  createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onSubmit(value: User) {
    this.firebaseService.createUser(value)
      .subscribe(() => {
          this.router.navigate(['/home']);
      });
  }

}

class ReactiveBook {
  constructor(
    public descriptionDetail?: Array<string>
  ) {
  }
}
*/
