import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
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

  constructor(private apiService : ApiService,
              private userService : UserService,
              private notifService : NotifierService,
              private router : Router){
                this.checkAuthenticationStatus();
              }

  ngOnInit(): void {

  }

  login(loginDto : LoginDto, callbackUrl : string) : void {
    this.apiService.post('auth/login', loginDto).subscribe({
      next : (response) => {
        if(response.isSuccess){
          this.setAuthToken(response.token)
          this.isAuthenticatedSubject.next(true);
          this.userService.setCurrentUser(response.user)
          this.setRememberBe(loginDto.RememberMe)
          console.log(loginDto.RememberMe)
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
    this.apiService.post('auth/register', registerDto).subscribe({
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
    this.apiService.get("auth/logout").subscribe({
      next: () => this.notifService.notify('success',"Déconnexion réussie"),
      error : () => this.notifService.notify('error',"Impossible de joindre l'API")
    })

    this.removeLocalStorageInfo()
    this.userService.setCurrentUser(null)
    this.isAuthenticatedSubject.next(false);
    if(this.router.url.match("/user") || this.router.url.match("/admin")){
      this.router.navigate(['/'])
    }
  }
  
  setAuthenticated(value : boolean){
    this.isAuthenticatedSubject.next(value)
  }

  setRememberBe(value : boolean){
    this.rememberMe = value;
    localStorage.setItem("rememberMe", value.toString());
  }

  setAuthToken(token: string): void {
    localStorage.setItem("bearer",token)
  }



  getAuthToken(): string | null {
    var token = localStorage.getItem("bearer")
    return token;
  }



  removeLocalStorageInfo(): void{
    localStorage.removeItem("bearer");
    localStorage.removeItem("rememberMe")
  }



  isAuthenticatedObervable(){
    return this.isAuthenticatedSubject;
  }

  isAuthenticated(){
    return this.isAuthenticatedSubject.value
  }

  keepConnection(){
    return this.rememberMe
  }



  private checkAuthenticationStatus() {
    const token = this.getAuthToken()
    const isAuthenticated = !!token;
    if(isAuthenticated){
      const rememberMe = localStorage.getItem("rememberMe")
      if(rememberMe){
        this.rememberMe = Boolean(rememberMe)
      }
    }
    this.isAuthenticatedSubject.next(isAuthenticated);
  }
}
