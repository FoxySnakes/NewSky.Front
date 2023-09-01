import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { LoginDto, RegisterDto } from '../models/AuthModel';
import { UserService } from './user.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://votre-api-url/';

  constructor(private api : ApiService,
              private userService : UserService,
              private notifService : NotifierService,
              private router : Router) { }

  login(loginDto : LoginDto, callbackUrl : string) : string | null {
    this.api.post('auth/login', loginDto).subscribe({
      next : (response) => {
        if(response.isSuccess){
          this.setAuthToken(response.token)
          this.notifService.notify('success','Connexion réussie, Redirection dans 3s')
          setTimeout(() => {
            this.router.navigate([callbackUrl]);
          }, 3000);
          return null;
        }
        else{
          return "Nom d'utilisateur ou mot de passe invalide"
        }
      },
      error : (error) => {
        this.notifService.notify('error',"Impossible de joindre l'API")
        return null;
      }
      
    })
    return null;
  }

  register(registerDto : RegisterDto, callbackUrl : string) : string | null{
    this.api.post('auth/register', registerDto).subscribe({
      next : (response) => {
        if(response.isSuccess){
          this.setAuthToken(response.token)
          this.notifService.notify('success','Inscription réussie, Redirection dans 3s')
          setTimeout(() => {
            this.router.navigate([callbackUrl]);
          }, 3000);
          return null;
        }
        else{
          if(response.errors[0].code == 102){
            switch(response.errors[0].entity){
              case 'UserName':
                return `Un utilisateur existe déjà avec ce nom (${response.user.userName})`
              case 'Email':
                return `Un utilisateur existe déjà avec ce mail (${response.user.email})`
              case 'PhoneNumber':
                return `Un utilisateur existe déjà avec ce téléphone (${response.user.phoneNumber})`
              default:
                return null;
            }
          }
          else{
            this.notifService.notify('error', "Impossible d'enregistrer l'utilisateur")
            return null;
          }
        }
      },
      error : () => {
        this.notifService.notify('error',"Impossible de joindre l'API")
        return null;
      }
    })
    return null;
  }

  logout(): void {
    localStorage.removeItem("bearer");
    this.userService.setCurrentUser(null)
  }

  setAuthToken(token: string): void {
    localStorage.setItem("bearer",token)
  }

  getAuthToken(): string | null {
    var token = localStorage.getItem("bearer")
    return token;
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    if (token == null)
      return false;

    return true;
  }
}
