import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/authService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NewSky';

  constructor(private apiService : ApiService,
              private userService : UserService,
              private authService : AuthService)
  {}
  
  ngOnInit(): void {
    console.log(this.authService.isAuthenticated())
    if(this.authService.isAuthenticated()){
      this.apiService.get('user/current').subscribe({
        next: (response) => {
          this.userService.setCurrentUser(response.user)
        }
      })
    }
  }
}
