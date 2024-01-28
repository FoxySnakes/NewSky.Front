import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { ListProductsComponent } from './list-products/list-products.component';
import { CartComponent } from './cart/cart.component';
import { LayoutStoreComponent } from './layout-store/layout-store.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListProductsComponent,
    CartComponent,
    LayoutStoreComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class StoreModule { }
