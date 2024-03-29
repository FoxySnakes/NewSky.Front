import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/main-layout/layout/layout.component';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { PermissionGuard } from './guards/permission.guard';
import { PermissionName } from './models/UserModel';

const routes: Routes = [
  {path: '', component: LayoutComponent,
  children: [
    { path : 'home', redirectTo: '', pathMatch: 'full'},
    { path : '', component: HomeComponent},
    { path : 'not-found', component: NotFoundComponent},

    { path: 'vote', 
      loadChildren: () => import('./modules/vote/vote.module').then(x => x.VoteModule) },

    { path: 'user', 
      loadChildren: () => import('./modules/userboard/userboard.module').then(x => x.UserboardModule), 
      canActivate:[AuthGuard]},

    { path: 'store', 
      loadChildren: () => import('./modules/store/store.module').then(x => x.StoreModule)},

  ]},

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  { path: 'admin', 
    loadChildren: () => import('./modules/adminboard/adminboard.module').then(x => x.AdminboardModule), 
    canActivate:[PermissionGuard], 
    data:{
      permissionRequired : PermissionName.AccessToAdminPanel
    }},

  { path: '**', redirectTo: 'not-found' },
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
