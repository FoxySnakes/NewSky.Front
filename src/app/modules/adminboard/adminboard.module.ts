import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminboardRoutingModule } from './adminboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutAdminboardComponent } from './layout-adminboard/layout-adminboard.component';
import { UserlistComponent } from './userlist/userlist.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { VotelistComponent } from './votelist/votelist.component';
import { GlobalSettingsComponent } from './global-settings/global-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListModulesComponent } from './list-modules/list-modules.component';
import { RolelistComponent } from './rolelist/rolelist.component';
import { TokenInvalidComponent } from './token-invalid/token-invalid.component';


@NgModule({
  declarations: [
    DashboardComponent,
    LayoutAdminboardComponent,
    UserlistComponent,
    OrderlistComponent,
    VotelistComponent,
    GlobalSettingsComponent,
    ListModulesComponent,
    RolelistComponent,
    TokenInvalidComponent
  ],
  imports: [
    CommonModule,
    AdminboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,

  ]
})
export class AdminboardModule { }
