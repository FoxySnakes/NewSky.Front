import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { NotifierService } from 'angular-notifier';
import { User } from './models/UserModel';
import { AppSettingService } from './services/appsetting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'NewSky';

  constructor(private userService : UserService,
              private authService : AuthService,
              private appSettingsService : AppSettingService)
  {}
  
  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.userService.getUserInformation()
    }

    this.appSettingsService.fetchAppSettingsPublic();

  }

  @HostListener('window:beforeunload')
  beforeUnloadHandler() {
    if(!this.authService.keepConnection()){
      this.authService.removeLocalStorageInfo()
    }
  }
}
