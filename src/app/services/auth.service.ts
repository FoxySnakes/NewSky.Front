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

  login(loginDto : LoginDto, callbackUrl : string) : void {
    this.api.post('auth/login', loginDto).subscribe({
      next : (response) => {
        if(response.isSuccess){
          this.setAuthToken(response.token)
          this.isAuthenticatedSubject.next(true);
          this.userService.setCurrentUser(response.user)
          this.setRememberBe(loginDto.RememberMe)
          this.notifService.notify('success','Connexion réussie')
          if(callbackUrl == "/login " || callbackUrl == "/register"){
            this.router.navigate(["/"])
          }
          else{
            this.router.navigate([callbackUrl])
          }
        }
        else if(response.isBanned){
          this.notifService.notify('warning', 'Cet utilisateur n\'est pas accepté')
        }
        else if(response.isLocked){
          this.notifService.notify('warning','Compte bloqué, contacter un admin')
        }
        else if(response.requiresTwoFactor){
          this.router.navigate(['/login/mfa'])
        }
        else{
          this.notifService.notify("error", "Nom d'utilisateur ou mot de passe invalide")
        }
      },
      error : (error) => {
        this.notifService.notify('error',"Impossible de joindre l'API")
      }
      
    })
  }

  register(registerDto : RegisterDto, callbackUrl : string) : void{
    this.api.post('auth/register', registerDto).subscribe({
      next : (response) => {
        if(response.isSuccess){
          this.setAuthToken(response.token)
          this.userService.setCurrentUser(response.user)
          this.isAuthenticatedSubject.next(true);
          this.notifService.notify('success','Inscription réussie')
           if(callbackUrl == "/login " || callbackUrl == "/register"){
             this.router.navigate(["/"])
           }
           else{
             this.router.navigate([callbackUrl])
           }
        }
        else{
          this.notifService.notify('error', "Impossible d'enregistrer l'utilisateur")
        }
      },
      error : () => {
        this.notifService.notify('error',"Impossible de joindre l'API")
      }
    })
  }

  logout(): void {
    this.api.get("auth/logout").subscribe({
      next: () => {
        this.removeAuthToken()
        this.userService.setCurrentUser(null)
        this.isAuthenticatedSubject.next(false);
      },
      error : () => this.notifService.notify('error',"Impossible de joindre l'API")
    })

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

  isAuthenticatedObervable(){
    return this.isAuthenticatedSubject;
  }

  isAuthenticated(){
    return this.isAuthenticatedSubject.value
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
