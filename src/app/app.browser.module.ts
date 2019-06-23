import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';

import { AppComponent } from './app.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ReadComponent } from './components/read/read.component';
import { EditUserResolver } from './components/edit-user/edit-user.resolver';
import { NewUserComponent } from './components/new-user/new-user.component';
import { HomeComponent } from './components/home/home.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddBookComponent } from './components/add-book/add-book.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { FirebaseService } from './services/firebase.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatSliderModule, MatDialogModule, MatSlideToggleModule } from '@angular/material';
import { AppModule } from './app.module';

@NgModule({
  entryComponents: [],
  imports: [
    
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    MatSlideToggleModule,
    AppModule,
    BrowserTransferStateModule
  ],
  providers: [FirebaseService, 
  EditUserResolver,
  AuthService,
  AuthGuard
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppBrowserModule { }
