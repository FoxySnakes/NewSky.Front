import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserboardRoutingModule } from './userboard-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { PaymentInformationComponent } from './payment-information/payment-information.component';
import { AccountSecurityComponent } from './account-security/account-security.component';
import { LayoutUserboardComponent } from './layout-userboard/layout-userboard.component';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProfileComponent,
    PaymentInformationComponent,
    AccountSecurityComponent,
    LayoutUserboardComponent,
  ],
  imports: [
    CommonModule,
    UserboardRoutingModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    SharedModule
  ],
  providers: [
    DialogService
  ]
})
export class UserboardModule { }
