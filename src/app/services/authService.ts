import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { LoginDto, RegisterDto } from '../models/AuthModel';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://votre-api-url/';

  constructor(private api : ApiService,
              private userService : UserService) { }

  login(loginDto : LoginDto): Observable<any> {
    return this.api.post('auth/login', loginDto)
  }

  register(registerDto : RegisterDto) : Observable<any>{
    return this.api.post('auth/register', registerDto)
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
