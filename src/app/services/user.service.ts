import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject$ = new BehaviorSubject<User | null>(null);

  constructor() { }

  getCurrentUserObservable(){
    return this.currentUserSubject$.asObservable();
  }

  setCurrentUser(user : User | null){
    this.currentUserSubject$.next(user);
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
}
