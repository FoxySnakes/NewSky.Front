import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { TimeFormatPipe } from './pipes/timeformat.pipe';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card'



@NgModule({
  declarations: [
    TimeFormatPipe,
    LoaderComponent,
    
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimeFormatPipe,
    LoaderComponent,
    DialogModule,
    ToastModule,
    CardModule
  ],
  providers: [
    MessageService
  ]
})
export class SharedModule {}