import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { Role, User } from '../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(apiService : ApiService) { }

  getCurrentUser(){
    return this.currentUserSubject;
  }

  setCurrentUser(user : User | null){
    this.currentUserSubject.next(user);
  }

  isAdmin() : boolean{
    this.currentUserSubject.subscribe({
      next: (user)=>{
        if(user?.Role == "Admin" || user?.Role == "Developer")
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
    return `https://minotar.net/armor/body/${this.currentUserSubject.value?.Uuid}/${size}.png`
  }
}
