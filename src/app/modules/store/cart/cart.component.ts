import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { PackageCart } from 'src/app/models/StoreModel';
import { TebexService } from 'src/app/services/tebex.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartPackages: PackageCart[] = []

  dialogModifyPackageVisible = false

  modifyProductForm = new FormGroup({
    packageId: new FormControl(0),
    quantity: new FormControl(0),
    priceUnit: new FormControl(0)
  })

  constructor(private userService: UserService,
              private tebexService: TebexService,
              private notifyService : NotifierService) { }

  ngOnInit(): void {
    this.userService.getCurrentUserObservable().subscribe({
      next: (user) => {
        if (user) {
          this.cartPackages = user.packages
        }
      }
    })
  }

  openModifyProductDialog(packageId: number, quantity: number, priceUnit: number) {
    this.modifyProductForm.setValue({ packageId: packageId, quantity: quantity, priceUnit: priceUnit })
    this.dialogModifyPackageVisible = true
  }

  getTotalPackagePrice(quantiy: number, priceUnit: number) {
    return Math.round((quantiy * priceUnit) * 100) / 100
  }

  updatePackage() {
    this.tebexService.managePackageOnCart(this.modifyProductForm.controls.packageId.value!,
      this.modifyProductForm.controls.quantity.value!).subscribe({
        next: (response) => {
          if(response.result.success){
            this.userService.updateUserPackages(response.packages)
            this.notifyService.notify("success", "Produit modifié")
            this.dialogModifyPackageVisible = false
          }
          else{
            this.notifyService.notify("error", "Impossible de modifier le produit")
          }
        },
        error: () => this.notifyService.notify("error", "Impossible de modifier le produit")
      })
  }

  deletePackage(packageId : number) {
    this.tebexService.managePackageOnCart(packageId,0).subscribe({
      next: (response) => {
        if(response.result.success){
          this.userService.updateUserPackages(response.packages)
          this.notifyService.notify("success", "Produit supprimé")
        }
        else{
          this.notifyService.notify("error", "Impossible de supprimer le produit")
        }
      },
      error: () => this.notifyService.notify("error", "Impossible de supprimer le produit")
      })
  }
}
