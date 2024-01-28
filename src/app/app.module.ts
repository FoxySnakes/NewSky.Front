import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { FooterComponent } from './modules/main-layout/footer/footer.component';
import { NavigationComponent } from './modules/main-layout/navigation/navigation.component';
import { LayoutComponent } from './modules/main-layout/layout/layout.component';
import { NotifierModule } from 'angular-notifier';
import { AuthModule } from './modules/auth/auth.module';
import { AuthInterceptor } from './interceptors/Auth.interceptor';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavigationComponent,
    LayoutComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
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
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi : true
    },
    {
      provide: LOCALE_ID,
      useValue: 'fr' 
    }
  ],
  bootstrap: [AppComponent],
  exports: [
    BrowserAnimationsModule  ]
})
export class AppModule { }
