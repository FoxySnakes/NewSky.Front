import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(apiService : ApiService) { }

  getCurrentUser(){
    return this.currentUserSubject.value;
  }

  setCurrentUser(user : User | null){
    this.currentUserSubject.next(user);
  }

  getUserBodySkinUrl(size : number){
    return `https://minotar.net/armor/body/${this.currentUserSubject.value?.uuid}/${size}.png`
  }
}
