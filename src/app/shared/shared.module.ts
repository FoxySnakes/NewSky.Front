import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { TimeFormatPipe } from './pipes/timeformat.pipe';

import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card'
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { PriceformatPipe } from './pipes/priceformat.pipe';

@NgModule({
  declarations: [
    TimeFormatPipe,
    LoaderComponent,
    PriceformatPipe,
    
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimeFormatPipe,
    PriceformatPipe,
    LoaderComponent,

    DialogModule,
    ToastModule,
    CardModule,
    OverlayPanelModule,
    DropdownModule,
    PaginatorModule,
    InputNumberModule,
    PanelModule
    
  ],
  providers: [
    MessageService
  ]
})
export class SharedModule {}