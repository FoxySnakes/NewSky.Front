import { Injectable } from '@angular/core';
import { TebexCategory, TebexSale} from '../models/StoreModel';
import { ApiService } from './api.service';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TebexService {

  public isLoadingCategory = new BehaviorSubject<boolean>(false);
  private selectedCategory = new BehaviorSubject<TebexCategory | undefined>(undefined);

  constructor(private apiService: ApiService) { }

  getCategories(withPackages: boolean): Observable<TebexCategory[]> {
    this.isLoadingCategory.next(true)
    return this.apiService.get(`tebex/listing?withPackages=${withPackages}`)
  }
    
  setSelectedCategory(category: TebexCategory | undefined) {
    this.selectedCategory.next(category);
  }

  getSelectedCategory() {
    return this.selectedCategory.asObservable();
  }

  getLastSales() : Observable<TebexSale[]>{
    return this.apiService.get('tebex/last-sales')
  }

  managePackageOnCart(packageId : number, quantity : number){
    return this.apiService.post('tebex/manage-package', {packageTebexId : packageId, quantity : quantity})
  }

  clearUserCart(){
    return this.apiService.deleteAll("tebex/clear-cart")
  }

  getPaymentLink(){
    return this.apiService.get("tebex/cart-link")
  }
}