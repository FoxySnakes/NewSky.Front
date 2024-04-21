import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, defer, interval, map, take } from 'rxjs';
import { ApiService } from './api.service';
import { NotifierService } from 'angular-notifier';
import { PackageCart } from '../models/StoreModel';
import { Filter } from '../models/FilterModel';
import { Permission, User } from '../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject$ = new BehaviorSubject<User | null>(null);
  public fetchingUserInformation = false

  constructor(private apiService: ApiService,
    private notifyService: NotifierService) { }

  getCurrentUserObservable() {
    return this.currentUserSubject$.asObservable();
  }

  getUserInformation() {
    this.fetchingUserInformation = true
    this.apiService.get('user/current').subscribe({
      next: (response: User | null) => {
        this.setCurrentUser(response)
        console.log(response?.permissions)
        this.fetchingUserInformation = false
      },
      error: () => {
        this.fetchingUserInformation = false
        this.notifyService.notify('warning', "Impossible de joindre l'API")
      }
    })
  }

  setCurrentUser(user: User | null) {
    this.currentUserSubject$.next(user);
  }

  updateUserPackages(packages: PackageCart[]) {
    this.currentUserSubject$.next(
      new User(
        this.currentUserSubject$.value!.userName,
        this.currentUserSubject$.value!.uuid,
        this.currentUserSubject$.value!.email,
        this.currentUserSubject$.value!.roles,
        this.currentUserSubject$.value!.permissions,
        packages,
        this.currentUserSubject$.value!.banishmentEnd,
        this.currentUserSubject$.value!.lockoutEnd
      )
    )
  }

  updateUserEmail(email: string): Observable<boolean> {
    return new Observable((observer) => {
      var data = { Email: email }
      this.apiService.post('user/update-email', data).subscribe({
        next: (result) => {
          if (result.succeeded) {
            this.notifyService.notify("success", "Email changé avec succès")
            this.currentUserSubject$.next(
              new User(
                this.currentUserSubject$.value!.userName,
                this.currentUserSubject$.value!.uuid,
                email,
                this.currentUserSubject$.value!.roles,
                this.currentUserSubject$.value!.permissions,
                this.currentUserSubject$.value!.packages,
                this.currentUserSubject$.value!.banishmentEnd,
                this.currentUserSubject$.value!.lockoutEnd
              )
            )
            observer.next(true);
            observer.complete();
          } else {
            this.notifyService.notify("error", "Erreur durant le changement de votre mail")
            observer.next(false);
            observer.complete();
          }
        },
        error: () => {
          this.notifyService.notify("error", "Erreur durant le changement de votre mail")
          observer.next(false);
          observer.complete();
        }
      })
    });
  }

  getUserBodySkinUrl(size: number) {
    return `https://minotar.net/armor/body/${this.currentUserSubject$.value?.uuid}/${size}.png`
  }

  getHeadSkinUrl(size: number) {
    return `https://minotar.net/helm/${this.currentUserSubject$.value?.uuid}/${size}.png`
  }

  getAllUsersPaged(pageSize: number, pageNumber: number, filter: Filter, search: string) {
    return this.apiService.getPaged('user', pageSize, pageNumber, filter, search)
  }

  async hasPermission(permissionName: string) {
    while (this.fetchingUserInformation) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Adjust the time interval as needed
    }
  

    var userPermissions = this.currentUserSubject$.value?.permissions.filter((x: Permission) => x.name == permissionName)
    var hasPermission = false
    var hasPermissionRefused = false
    userPermissions?.forEach((permission: Permission) => {
      if (permission.hasPermission == false) {
        hasPermissionRefused = false
      }
    })

    if (!hasPermissionRefused) {
      userPermissions?.forEach((permission: Permission) => {
        if (permission.hasPermission == true) {
          hasPermission = true
        }
      })
    }

    return hasPermission;
  }  

  updateUserInformations(username : string | null = null, uuid : string, roles : string[] = []){
    var data = {
      username : username,
      uuid : uuid,
      roles : roles
    }
    return this.apiService.post("user/update-informations",data)
  }

  updateUserPunishments(username : string, banishmentEnd : Date | null, lockoutEnd : Date | null){
    var data = {
      banishmentEnd : banishmentEnd,
      username : username,
      lockoutEnd : lockoutEnd
    }
    return this.apiService.post("user/update-punishments", data)
  }
}
