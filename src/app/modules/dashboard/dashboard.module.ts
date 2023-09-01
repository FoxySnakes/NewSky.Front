import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminboardComponent } from './adminboard/adminboard.component';
import { UserboardComponent } from './userboard/userboard.component';



@NgModule({
  declarations: [
    AdminboardComponent,
    UserboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
