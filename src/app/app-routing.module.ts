import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/main-layout/layout/layout.component';
import { VoteComponent } from './modules/vote/vote.component';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { UserboardComponent } from './modules/dashboard/userboard/userboard.component';
import { AdminboardComponent } from './modules/dashboard/adminboard/adminboard.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [{
  path: '', component: LayoutComponent,
  children: [
    { path : 'home', redirectTo: '', pathMatch: 'full'},
    { path : '', component: HomeComponent},
    { path : 'not-found', component: NotFoundComponent}
    { path: 'vote', component: VoteComponent },
    { path: 'test', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'userboard', component: UserboardComponent, canActivate: [AuthGuard] },
    { path: 'adminboard', component: AdminboardComponent, canActivate:[AdminGuard] }
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'not-found' }
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
