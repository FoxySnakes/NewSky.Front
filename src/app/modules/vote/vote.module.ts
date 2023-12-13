import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteComponent } from './vote/vote.component';
import { VoteRoutingModule } from './vote-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    VoteComponent,
  ],
  imports: [
    CommonModule,
    VoteRoutingModule,
    SharedModule
  ]
})
export class VoteModule { }
