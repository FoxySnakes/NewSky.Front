import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminboardComponent } from './layout-adminboard/layout-adminboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VotelistComponent } from './votelist/votelist.component';
import { UserlistComponent } from './userlist/userlist.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { GlobalSettingsComponent } from './global-settings/global-settings.component';
import { PermissionName } from 'src/app/models/UserModel';
import { PermissionGuard } from 'src/app/guards/permission.guard';
import { ListModulesComponent } from './list-modules/list-modules.component';
import { RolelistComponent } from './rolelist/rolelist.component';
import { TokenInvalidComponent } from './token-invalid/token-invalid.component';

const routes: Routes = [
  {
    path: "", component: LayoutAdminboardComponent,
    children: [
      { path: "", component: ListModulesComponent},
      // {
      //   path: "dashboard", component: DashboardComponent,
      //   canActivate: [PermissionGuard],
      //   data: { permissionRequired: PermissionName.AccessToDashboardOnAdminPanel }
      // },
      {
        path: "users", component: UserlistComponent,
        canActivate: [PermissionGuard],
        data : { permissionRequired : PermissionName.AccessToUsersOnAdminPanel} ,
      },
      {
        path: "roles", component: RolelistComponent,
        canActivate: [PermissionGuard],
        data : { permissionRequired : PermissionName.AccessToRolesOnAdminPanel} 
      },
      {
        path: "votes", component: VotelistComponent,
        canActivate: [PermissionGuard],
        data : { permissionRequired : PermissionName.AccessToVotesOnAdminPanel} 
      },
      {
        path: "orders", component: OrderlistComponent,
        canActivate: [PermissionGuard],
        data : { permissionRequired : PermissionName.AccessToSalesOnAdminPanel} 
      },
      {
        path: "global-settings", component: GlobalSettingsComponent,
        canActivate: [PermissionGuard],
        data : { permissionRequired : PermissionName.AccessToGeneralSettingsOnAdminPanel} 
      },
      {
        path: "token-invalid", component: TokenInvalidComponent,
      },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminboardRoutingModule { }
