import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout-adminboard',
  templateUrl: './layout-adminboard.component.html',
  styleUrls: ['./layout-adminboard.component.scss']
})
export class LayoutAdminboardComponent implements OnInit{

  activeRouterLink = ""

  constructor(private authService: AuthService,
              private router: Router){}

  ngOnInit(): void {
    this.activeRouterLink = this.router.url

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      (event : any) => {
        this.activeRouterLink = event.url
      }
    )
  }

  logout(){
    this.authService.logout()
  }
}
