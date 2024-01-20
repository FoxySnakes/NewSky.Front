import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Injectable, isDevMode } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private apiService: ApiService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.apiService.get("auth/access-admin-panel").pipe(
        map((isAdmin: boolean) => {
          if (isAdmin) {
            this.userService.setCurrentUserAdminPanelPermissions()
            return true;
          } else {
            this.router.navigate(['not-found']);
            return false;
          }
        }),
        catchError((error) => {
          this.router.navigate(['not-found']);
          return of(false)
        })
      );
  }
}
