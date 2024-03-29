import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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

  constructor(private userService : UserService,
              private authService : AuthService)
  {}
  
  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.userService.getUserInformation()
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
