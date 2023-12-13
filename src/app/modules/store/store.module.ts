import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { CartComponent } from './cart/cart.component';
import { RecapPaymentComponent } from './recap-payment/recap-payment.component';
import { PaymentConfirmationComponent } from './payment-confirmation/payment-confirmation.component';
import { LayoutStoreComponent } from './layout-store/layout-store.component';


@NgModule({
  declarations: [
    ListProductsComponent,
    AddProductsComponent,
    CartComponent,
    RecapPaymentComponent,
    PaymentConfirmationComponent,
    LayoutStoreComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }
