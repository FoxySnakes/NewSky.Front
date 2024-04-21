import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  
  isLoading = true

  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    while (this.userService.fetchingUserInformation) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Adjust the time interval as needed
    }
    this.isLoading = false
  }

}
