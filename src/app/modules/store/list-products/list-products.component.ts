import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { TebexCategory, TebexPackage } from 'src/app/models/StoreModel';
import { TebexService } from 'src/app/services/tebex.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  category : TebexCategory | undefined
  productLoading = false
  addProductLoading = false

  dialogAddProductVisible = false

  selectedProduct : TebexPackage | null = null

  productForm = new FormGroup({
    id : new FormControl<number>(0),
    name : new FormControl(""),
    price : new FormControl<number>(0),
    quantity : new FormControl<number>(1),
    imageUrl : new FormControl(""),
    totalPrice : new FormControl<number>(0)
  })

  constructor(private tebexService : TebexService,
              private userService : UserService,
              private notifyService : NotifierService){}

  ngOnInit(): void {
    this.tebexService.getSelectedCategory().subscribe({
      next: (selectedCategory) => {
        this.category = selectedCategory
      }
    })
    this.tebexService.isLoadingCategory.subscribe({
      next: (isLoading) => {
        this.productLoading = isLoading
      }
    })
    this.productForm.controls.quantity.valueChanges.subscribe({
      next : () => {
        var totalPrice = Math.round(this.productForm.controls.quantity.value! * this.productForm.controls.price.value! * 100) / 100
        this.productForm.controls.totalPrice.setValue(totalPrice)
      }
    })
  }

  openDialogAddProduct(productId : number){
    var product = this.category?.packages.find(x => x.id == productId)!
    this.productForm.setValue({
      id : product.id,
      name : product.name,
      price : product.totalPrice,
      quantity : 1,
      imageUrl : product.imageUrl == "" ? "../../../../assets/pictures/image-not-found.png" : product.imageUrl,
      totalPrice : product.totalPrice
    })
    this.dialogAddProductVisible = true
  }

  addProductToCart(){
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
