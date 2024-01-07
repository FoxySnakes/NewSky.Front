import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/UserModel';
import { ApiService } from './api.service';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject$ = new BehaviorSubject<User | null>(null);

  constructor(private apiService : ApiService,
              private notifyService : NotifierService) { }

  getCurrentUserObservable(){
    return this.currentUserSubject$.asObservable();
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

  isAdmin() : boolean{
    this.currentUserSubject$.subscribe({
      next: (user)=>{
        if(user?.role == "Admin" || user?.role == "Developer")
            return true;
          return false
      },
      error: () => {
        return false;
      }
    })
    return false;
  }

  getUserBodySkinUrl(size : number){
    return `https://minotar.net/armor/body/${this.currentUserSubject$.value?.uuid}/${size}.png`
  }

  getHeadSkinUrl(size : number){
    return `https://minotar.net/helm/${this.currentUserSubject$.value?.uuid}/${size}.png`
  }
}
