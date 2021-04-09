import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuardAuthService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  /*. If the user is not currently authenticated (the JWT is missing from local storage), 
  redirect them to the “/login” route and prevent access to the route by returning false. 
  If “isAuthenticated()” returns true, grant access to the route by returning true. */
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
