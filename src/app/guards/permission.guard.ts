import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { PermissionName } from '../models/UserModel';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private router: Router,
              private userService : UserService,
              private notifyService : NotifierService){}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : Promise<boolean> {
      var permissionRequired = next.data['permissionRequired']
      var hasPermission = await this.userService.hasPermission(permissionRequired)
      if(hasPermission){
        return true;
      }
      else{
        if(state.url.startsWith('/admin') && permissionRequired != PermissionName.AccessToAdminPanel){
          this.notifyService.notify("error", "Vous n'avez pas la permission de faire ceci")

          this.router.navigate(['/admin'])
        }
        else{
          this.notifyService.notify("error", "Vous n'avez pas la permission de faire ceci")
          this.router.navigate(['/'])
        }
        return false;
      }
  }
}
