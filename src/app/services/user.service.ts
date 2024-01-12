import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, defer, interval, map, take } from 'rxjs';
import { User } from '../models/UserModel';
import { ApiService } from './api.service';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject$ = new BehaviorSubject<User | null>(null);
  private fetchingUserInformation = false

  constructor(private apiService : ApiService,
              private notifyService : NotifierService) { }

  getCurrentUserObservable(){
    return this.currentUserSubject$.asObservable();
  }

  getUserInformation(){
    this.fetchingUserInformation = true
    this.apiService.get('user/current').subscribe({
      next: (response : User | null) => {
       this.setCurrentUser(response)
       this.fetchingUserInformation = false
      },
      error: () => {
        this.fetchingUserInformation = false
        this.notifyService.notify('warning', "Impossible de joindre l'API")
      }
    })
  }

  setCurrentUser(user : User | null){
    this.currentUserSubject$.next(user);
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
                false,
                this.currentUserSubject$.value!.role,
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

  isAdmin(): Observable<boolean> {
    return this.currentUserSubject$.pipe(
      map((user) => {
        if (user) {
          const userRole = user?.role;
          return ['Admin', 'SuperAdmin', 'Developer'].includes(userRole);
        } else {
          return false;
        }
      })
    );
  }

  getUserBodySkinUrl(size : number){
    return `https://minotar.net/armor/body/${this.currentUserSubject$.value?.uuid}/${size}.png`
  }

  getHeadSkinUrl(size : number){
    return `https://minotar.net/helm/${this.currentUserSubject$.value?.uuid}/${size}.png`
  }
}
