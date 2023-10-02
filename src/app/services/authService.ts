import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { LoginDto, RegisterDto } from '../models/AuthModel';
import { UserService } from './user.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private apiUrl = 'https://votre-api-url/';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private rememberMe = false;

  constructor(private api : ApiService,
              private userService : UserService,
              private notifService : NotifierService,
              private router : Router){
                this.checkAuthenticationStatus();
              }

  ngOnInit(): void {

  }

  login(loginDto : LoginDto, callbackUrl : string) : string | null {
    this.api.post('auth/login', loginDto).subscribe({
      next : (response) => {
        if(response.isSuccess){
          this.setAuthToken(response.token)
          this.isAuthenticatedSubject.next(true);
          this.setRememberBe(loginDto.RememberMe)
          this.notifService.notify('success','Connexion réussie')
          if(callbackUrl == "/login " || callbackUrl == "/register"){
            this.router.navigate(["/"])
          }
          else{
            this.router.navigate([callbackUrl])
          }
          return null
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
          this.isAuthenticatedSubject.next(true);
          this.notifService.notify('success','Inscription réussie')
          this.router.navigate([callbackUrl]);
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
                return 'Erreur inconnue';
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
    this.removeAuthToken()
    this.userService.setCurrentUser(null)
    this.isAuthenticatedSubject.next(false);
  }

  setAuthToken(token: string): void {
    localStorage.setItem("bearer",token)
  }

  getAuthToken(): string | null {
    var token = localStorage.getItem("bearer")
    return token;
  }

  removeAuthToken(): void{
    localStorage.removeItem("bearer");
  }

  isAuthenticated(){
    return this.isAuthenticatedSubject;
  }

  setRememberBe(value : boolean){
    this.rememberMe = value;
  }

  keepConnection(){
    return this.rememberMe
  }

  private checkAuthenticationStatus() {
    const token = this.getAuthToken()
    const isAuthenticated = !!token;
    this.isAuthenticatedSubject.next(isAuthenticated);
  }
}
