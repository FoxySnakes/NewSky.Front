import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { CartComponent } from './cart/cart.component';
import { LayoutStoreComponent } from './layout-store/layout-store.component';

const routes: Routes = [
  {
    path: "", component: LayoutStoreComponent, children: [
      { path: "", redirectTo: "product/", pathMatch: "full" },
      { path: "product", redirectTo: "product/", pathMatch: "full" },
      { path: "cart", component: CartComponent },
      { path: "product/:categoryName", component: ListProductsComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
