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


@NgModule({
  declarations: [
    DashboardComponent,
    LayoutAdminboardComponent,
    UserlistComponent,
    OrderlistComponent,
    VotelistComponent,
    GlobalSettingsComponent
  ],
  imports: [
    CommonModule,
    AdminboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,

  ]
})
export class AdminboardModule { }
