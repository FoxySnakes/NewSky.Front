import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { TebexCategory, TebexPackage } from 'src/app/models/StoreModel';
import { AuthService } from 'src/app/services/auth.service';
import { TebexService } from 'src/app/services/tebex.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit, OnDestroy {
  category : TebexCategory | undefined
  productLoading = false
  addProductLoading = false

  dialogAddProductVisible = false
  dialogLoginRequiredVisible = false

  selectedProduct : TebexPackage | null = null

  productForm = new FormGroup({
    id : new FormControl<number>(0),
    name : new FormControl(""),
    priceHt : new FormControl<number>(0),
    quantity : new FormControl<number>(1),
    imageUrl : new FormControl("")
  })

  isAuthenticated = false

  subs : Subscription[] = []

  constructor(private tebexService : TebexService,
              private userService : UserService,
              private notifyService : NotifierService,
              private authService : AuthService){}

  ngOnInit(): void {
    this.subs.push(...[
      this.tebexService.getSelectedCategory().subscribe({
        next: (selectedCategory) => {
          this.category = selectedCategory
        }
      }),

      this.tebexService.isLoadingCategory.subscribe({
        next: (isLoading) => {
          this.productLoading = isLoading
        }
      }),
      
      this.authService.isAuthenticatedObservable().subscribe({
        next : (isAuthenticated) => {
          this.isAuthenticated = isAuthenticated
        }
      })
    ])
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe())
  }

  openDialogAddProduct(productId : number){
    if(this.isAuthenticated){
      var product = this.category?.packages.find(x => x.id == productId)!
      this.productForm.setValue({
        id : product.id,
        name : product.name,
        priceHt : product.priceHt,
        quantity : 1,
        imageUrl : product.imageUrl == "" ? "../../../../assets/pictures/image-not-found.png" : product.imageUrl,
      })
      this.dialogAddProductVisible = true
    }
    else{
      this.dialogLoginRequiredVisible = true
    }
  }

  addProductToCart(){
    console.log("3")
    this.tebexService.managePackageOnCart(this.productForm.controls.id.value!, this.productForm.controls.quantity.value!).subscribe({
      next: (response) => {
        if(response.result.success){
          this.userService.updateUserPackages(response.packages)
          this.notifyService.notify("success", "Produit ajouté au panier")
          this.dialogAddProductVisible = false
        }
        else{
          this.notifyService.notify("error", "Impossible d'ajouter le produit au panier")
        }
      },
      error: () => this.notifyService.notify("error", "Impossible d'ajouter le produit au panier")
    })
  }
}
