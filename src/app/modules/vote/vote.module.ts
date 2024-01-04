import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteComponent } from './vote/vote.component';
import { VoteRoutingModule } from './vote-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    VoteComponent,
  ],
  imports: [
    CommonModule,
    VoteRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class VoteModule { }
