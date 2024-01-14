import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
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

  constructor(private tebexService: TebexService,
              private router: Router,
              private userService : UserService) { }

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
            this.totalCartPrice = 0;
            user.packages.forEach(x => {
              this.totalCartPrice += Math.round((x.quantity * x.tebexPackage.totalPrice) * 100) / 100
            })
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

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe())
  }
}
