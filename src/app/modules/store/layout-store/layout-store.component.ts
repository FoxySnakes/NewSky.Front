import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription, filter } from 'rxjs';
import { TebexCategory, TebexSale } from 'src/app/models/StoreModel';
import { TebexService } from 'src/app/services/tebex.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-layout-store',
  templateUrl: './layout-store.component.html',
  styleUrls: ['./layout-store.component.scss']
})
export class LayoutStoreComponent implements OnInit, OnDestroy {

  categories : TebexCategory[] = [];
  currentCategory: TebexCategory | undefined;
  categoryName = '';

  categoriesLoading = false

  lastSales : TebexSale[] = []

  subs : Subscription[] = []

  cartActive = false
  totalCartPrice = 0

  isAuthenticated = false

  constructor(private tebexService: TebexService,
              private router: Router,
              private userService : UserService,
              private notifyService : NotifierService) { }

  ngOnInit(): void {
    this.subs.push(...[
      this.tebexService.getCategories(true).subscribe({
        next: (categories) => {
          this.tebexService.isLoadingCategory.next(false)
          this.categories = categories
          this.checkCategory();
          this.checkCart()
  
          this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
          ).subscribe(() => {
            this.checkCategory();
            this.checkCart()


          });
        },
        error : () => this.tebexService.isLoadingCategory.next(false)
      }),

      this.tebexService.getLastSales().subscribe({
        next: (lastSales) => {
          this.lastSales = lastSales
        }
      }),
  
      this.tebexService.isLoadingCategory.subscribe({
        next : (loading) => {
          this.categoriesLoading = loading
        }
      }),

      this.userService.getCurrentUserObservable().subscribe({
        next: (user) => {
          if(user){
            this.isAuthenticated = true;
            var totalPriceHt = 0;
            user.packages.forEach(x => {
              totalPriceHt += Math.round((x.quantity * x.tebexPackage.priceHt) * 100) / 100
              this.totalCartPrice = Math.round(totalPriceHt * 1.2 * 100) / 100
            })
          }
          else{
            this.isAuthenticated = false
          }
        }
      })
    ])
  }

  checkCategory() {
    if(this.router.url.startsWith("/store/product")){
      this.categoryName = this.router.url.replace('/store', '').replace('/product/', '');
      this.currentCategory = this.categories.find(
        x => this.normalizeCategoryName(x.name) === this.categoryName
      );

      if (!this.currentCategory && this.categories.length > 0) {
        this.router.navigate(['/store/product', this.normalizeCategoryName(this.categories[0].name)]);
      }
      this.tebexService.setSelectedCategory(this.currentCategory)
    }
  }

  checkCart(){
    if(this.router.url == "/store/cart"){
      this.cartActive = true
    }
    else{
      this.cartActive = false
    }
  }

  normalizeCategoryName(categoryName: string) {
    categoryName = categoryName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    categoryName = categoryName.toLowerCase().replace(/\s/g, "-")
    return categoryName
  }

  startPayment(){
    if(this.totalCartPrice != 0){
      this.tebexService.getPaymentLink().subscribe({
        next : (response) => {
          this.notifyService.notify("warning", "Redirection vers le paiement dans 3 secondes")
          setTimeout(() => {
            window.location.href = response.linkUserCart
          }, 3000);
        },
        error: (error) => {
          this.notifyService.notify("error", "Erreur pour charger les articles")
          console.log(error)
        }
      })
    }
    else{
      this.notifyService.notify("warning", "Votre panier est vide")
    }
  }

  clearCart(){
    if(this.totalCartPrice != 0){
      this.tebexService.clearUserCart().subscribe({
        next: (response) => {
          this.userService.updateUserPackages(response.packages)
          if(response.result.success){
            this.notifyService.notify("success", "Panier vidé")
          }
          else{
            response.error.array.forEach((error : string) => {
              this.notifyService.notify("warning", error)
            });
          }
        },
        error: () => this.notifyService.notify("error", "Impossible de vider le panier")
      })
    }
    else{
      this.notifyService.notify("warning", "Votre panier est vide")
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe())
  }
}
