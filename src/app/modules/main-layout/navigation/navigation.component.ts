import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu'
import { Observable, Subscribable, Subscription, take, takeLast } from 'rxjs';
import { PermissionName, User } from 'src/app/models/UserModel';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  playerNumber = 12;
  isAuthenticated!: boolean
  globalMenuItems!: MenuItem[]

  user!: User | null;

  constructor(private authService: AuthService,
    private userService: UserService) {
    this.globalMenuItems = [
      {
        label: 'Utilisateurs',
        items: [
          {
            label: 'Profil',
            icon: 'icon-user',
            routerLink: '/user/profile',
            class: 'menu-button-link'
          },
          {
            label: 'Sécurité',
            icon: 'icon-lock',
            routerLink: '/user/account-security',
            class: 'menu-button-link'
          }
        ]
      },
      {
        label: 'Options',
        items: [
          {
            label: 'Déconnexion',
            icon: 'icon-logout',
            command: () => {
              this.logout()
            },
            class: 'menu-button-actions',
          }
        ]
      }
    ];
  }

  ngOnInit(): void {
    this.authService.isAuthenticatedObservable().subscribe({
      next: async (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated
        if (isAuthenticated) {
          this.userService.getCurrentUserObservable().subscribe({
            next: (user) => {
              this.user = user
            },
            error: (error) => console.log(error)
          })
          if (await this.userService.hasPermission(PermissionName.AccessToAdminPanel)) {

            this.globalMenuItems.splice(1, 0, {
              label: 'Admin',
              items: [
                {
                  label: 'Admin Panel',
                  icon: 'icon-dashboard',
                  routerLink: '/admin',
                  class: 'menu-button-link',
                }
              ]
            })
            console.log("add")
          }
        }
      }
    })
  }

  logout() {
    this.authService.logout();
  }
}
