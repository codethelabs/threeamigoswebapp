// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn();
    const currentPath = state.url;

    // Paths that only non-logged-in users can access
    const pathsForNonLoggedInUsers = ['/register', '/login'];

    // Paths that logged-in users cannot access
    const pathsForLoggedInUsers = ['/register', '/login'];

    if (isLoggedIn) {
      // User is logged in
      if (pathsForLoggedInUsers.includes(currentPath)) {
        // Redirect to dashboard if logged-in user tries to access register or login
        return this.router.navigate(['/dashboard']);
      } else {
        // Allow access for other paths
        return true;
      }
    } else {
      // User is not logged in
      if (pathsForNonLoggedInUsers.includes(currentPath)) {
        // Allow access to register or login for non-logged-in users
        return true;
      } else {
        // Redirect to login for other paths
        return this.router.navigate(['/login']);
      }
    }
  }
}
