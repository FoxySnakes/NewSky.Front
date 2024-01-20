import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscribable, Subscription, filter } from 'rxjs';
import { AdminPanelPermissionDto } from 'src/app/models/UserModel';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-layout-adminboard',
  templateUrl: './layout-adminboard.component.html',
  styleUrls: ['./layout-adminboard.component.scss']
})
export class LayoutAdminboardComponent implements OnInit, OnDestroy{

  activeRouterLink = ""

  adminPermissionDto : AdminPanelPermissionDto | null = null
  
  subs : Subscription[] = []

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router){}

  ngOnInit(): void {
    this.activeRouterLink = this.router.url

    this.subs.push(...[
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
        (event : any) => {
          this.activeRouterLink = event.url
        }
      ),

      this.userService.getCurrentUserAdminPanelPermissionsObservable().subscribe({
        next: (permissions) => {
          this.adminPermissionDto = permissions
        }
      })
    ])
  }

  logout(){
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe())
  }
}
