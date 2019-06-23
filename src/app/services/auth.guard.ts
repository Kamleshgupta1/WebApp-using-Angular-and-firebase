import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "./auth.service";
import { Observable } from 'rxjs';
import { WINDOW } from '@ng-toolkit/universal';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  
  constructor(@Inject(WINDOW) private window: Window, public authService: AuthService, public router: Router){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn !== true) {
      this.window.alert('Access Denied, Login is Required to Access This Page!')
      this.router.navigate(['profile'])
    }
    return true;
  }

}