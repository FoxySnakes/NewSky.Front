import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { PermissionName } from '../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private router: Router,
              private userService : UserService){}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : Promise<boolean> {
      var permissionRequired = next.data['permissionRequired']
      var hasPermission = await this.userService.hasPermission(permissionRequired)
      if(hasPermission){
        return true;
      }
      else{
        this.router.navigate(['/'])
        if(state.url.startsWith('/admin') && permissionRequired != PermissionName.AccessToAdminPanel){
          this.router.navigate(['/admin'])
        }
        else{
          this.router.navigate(['/'])
        }
        return false;
      }
  }
}
