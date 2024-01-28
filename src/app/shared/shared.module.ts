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
import { PagerComponent } from './pager/pager.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [
    TimeFormatPipe,
    LoaderComponent,
    PriceformatPipe,
    PagerComponent,

    
  ],
  imports: [
    CommonModule,
    DropdownModule,
    ReactiveFormsModule
  ],
  exports: [
    TimeFormatPipe,
    PriceformatPipe,
    LoaderComponent,
    PagerComponent,

    DialogModule,
    ToastModule,
    CardModule,
    OverlayPanelModule,
    DropdownModule,
    InputNumberModule,
    PanelModule,
    MultiSelectModule
    
  ],
  providers: [
    MessageService
  ]
})
export class SharedModule {}