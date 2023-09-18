import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/authService';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent  implements OnInit{
  playerNumber = 12;
  isAuthenticated! : boolean

  playerUsername : string | undefined;

  constructor(private authService : AuthService,
              private userService : UserService){}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated
      }
    })
    this.userService.getCurrentUser().subscribe({
      next: (user) =>{
        this.playerUsername = user?.userName
      }
    })
  }

  logout(){
    this.authService.logout();
  }
}
