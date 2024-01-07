import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AccountSecurityComponent } from './account-security/account-security.component';
import { LayoutUserboardComponent } from './layout-userboard/layout-userboard.component';

const routes: Routes = [
  { path: '', component: LayoutUserboardComponent,
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'profile'},
    { path: 'profile', component: ProfileComponent},
    { path: 'account-security', component: AccountSecurityComponent},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserboardRoutingModule { }
