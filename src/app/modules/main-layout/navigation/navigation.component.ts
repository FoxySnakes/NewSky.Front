import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent  implements OnInit{
  playerNumber = 12;
  isAuthenticated = false;

  playerUsername : string | undefined;

  constructor(private authService : AuthService,
              private userService : UserService){}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated()
    this.userService.getCurrentUser().subscribe({
      next: (user) =>{
        this.playerUsername = user?.userName
      }
    })
    console.log(this.playerUsername)
  }

  logout(){
    this.authService.logout();
  }
}
