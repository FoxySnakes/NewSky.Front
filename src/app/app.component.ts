import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { NotifierService } from 'angular-notifier';
import { User } from './models/UserModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'NewSky';

  constructor(private apiService : ApiService,
              private userService : UserService,
              private authService : AuthService,
              private notifyService : NotifierService)
  {}
  
  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
       this.apiService.get('user/current').subscribe({
         next: (response : User | null) => {
          this.userService.setCurrentUser(response)
         },
         error: () => this.notifyService.notify('warning', "Impossible de joindre l'API")
       })
    }
  }

  @HostListener('window:beforeunload')
  beforeUnloadHandler() {
    alert(this.authService.keepConnection())
    if(!this.authService.keepConnection()){
      
      this.authService.removeLocalStorageInfo()
    }
  }
}
