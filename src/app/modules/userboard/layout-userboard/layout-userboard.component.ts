import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-layout-userboard',
  templateUrl: './layout-userboard.component.html',
  styleUrls: ['./layout-userboard.component.scss']
})
export class LayoutUserboardComponent implements OnInit, OnDestroy{
  username : string | undefined
  userHeadSkinUrl! : string 
  activeRouterLink! : string
  sidebarVisible = false

  subs : Subscription[] = []

  constructor(private userSevice : UserService,private router: Router, private activatedRoute : ActivatedRoute){

  }

  ngOnInit(): void {
    this.activeRouterLink = this.router.url

    this.subs.push(...[
          this.userSevice.getCurrentUserObservable().subscribe({
      next: (user) => {
        this.username = user?.userName

        this.userHeadSkinUrl = this.userSevice.getHeadSkinUrl(75)
      }
    }),
    
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      (result : any) => {
        this.activeRouterLink = result.url
      }
    )
    ])

  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe())
  }
}
