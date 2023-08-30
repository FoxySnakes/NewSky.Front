import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { FooterComponent } from './modules/main-layout/footer/footer.component';
import { NavigationComponent } from './modules/main-layout/navigation/navigation.component';
import { LayoutComponent } from './modules/main-layout/layout/layout.component';
import { VoteComponent } from './modules/vote/vote.component';
import { AuthModule } from './modules/auth/auth.module';
import { NotifierModule } from 'angular-notifier';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavigationComponent,
    LayoutComponent,
    VoteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotifierModule.withConfig({
      animations:{
        enabled: true,
        hide: {
          speed: 300,
          preset: 'slide'
        },
        overlap: false,
        shift: {
          speed: 300
        },
        show: {
          speed: 300,
          preset: 'slide'
        }
      },
      behaviour : {
        showDismissButton : true,
        autoHide: 3000
      },
      position:{
        horizontal: {
          position: 'right',
          distance: 15
        },
        vertical: {
          position: 'top',
          distance: 15
        }
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
