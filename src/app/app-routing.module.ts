import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/main-layout/layout/layout.component';
import { VoteComponent } from './modules/vote/vote.component';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';

const routes: Routes = [{
  path: '', component: LayoutComponent,
  children: [
    { path : 'home', redirectTo: '', pathMatch: 'full'},
    { path : '', component: HomeComponent},
    { path: 'vote', component: VoteComponent },
    { path: 'test', component: HomeComponent, canActivate: [AuthGuard] },
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
const routerOptions : ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64]
}
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
