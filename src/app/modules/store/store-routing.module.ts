import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { CartComponent } from './cart/cart.component';
import { RecapPaymentComponent } from './recap-payment/recap-payment.component';
import { LayoutStoreComponent } from './layout-store/layout-store.component';

const routes: Routes = [
  {path: "", component: LayoutStoreComponent, children: [
    {path: "", component: ListProductsComponent},
    {path: "cart", component: CartComponent},
    {path: "payment", component: RecapPaymentComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
