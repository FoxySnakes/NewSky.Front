import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var urlWithoutParams = new URL(request.url).origin;

    if(urlWithoutParams == environment.apiUrl){
      var token = this.authService.getAuthToken();
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }
    else if(urlWithoutParams == environment.tebexUrl){
      request = request.clone({
        setHeaders: {
          "X-Tebex-Secret": environment.tebexSecret,
          "Access-Control-Allow-Origin": "*"
        }
      })

    }

    return next.handle(request);
  }
}
