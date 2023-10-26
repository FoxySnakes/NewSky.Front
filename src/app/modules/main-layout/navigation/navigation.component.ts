import { Component, OnInit } from '@angular/core';
import { Observable, Subscribable, Subscription, take, takeLast } from 'rxjs';
import { User } from 'src/app/models/UserModel';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent  implements OnInit{
  playerNumber = 12;
  isAuthenticated! : boolean

  user! : User | null;

  constructor(private authService : AuthService,
              private userService : UserService){}

  ngOnInit(): void {
    this.authService.isAuthenticatedObervable().subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated

        if(isAuthenticated){
          this.userService.getCurrentUserObservable().subscribe({
            next: (user) =>{
              this.user = user
            },
            error: (error) => console.log(error)
          })
        }
      }
    })
  }

  logout(){
    this.authService.logout();
  }
}
