import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ReadComponent } from './components/read/read.component';
import { EditUserResolver } from './components/edit-user/edit-user.resolver';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddBookComponent } from './components/add-book/add-book.component';

import { AuthGuard } from "./services/auth.guard";


export const rootRouterConfig: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-user', component: NewUserComponent, canActivate: [AuthGuard] },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'edit/:id', component: EditUserComponent, resolve:{data : EditUserResolver}, canActivate: [AuthGuard] },
  { path: 'details/:id', component: ReadComponent, resolve:{data : EditUserResolver} }
];
