import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminboardComponent } from './layout-adminboard/layout-adminboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VotelistComponent } from './votelist/votelist.component';
import { UserlistComponent } from './userlist/userlist.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { GlobalSettingsComponent } from './global-settings/global-settings.component';

const routes: Routes = [
  { path: "", component: LayoutAdminboardComponent,
    children : [
      { path: "dashboard", component: DashboardComponent},
      { path: "", redirectTo: "dashboard", pathMatch: "full"},
      { path: "votes", component: VotelistComponent},
      { path: "users", component: UserlistComponent},
      { path: "orders", component: OrderlistComponent},
      { path: "global-settings", component: GlobalSettingsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminboardRoutingModule { }
