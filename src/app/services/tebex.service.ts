import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category, Listing, Product } from '../models/StoreModel';

@Injectable({
  providedIn: 'root'
})
export class TebexService {

  constructor(private httpClient : HttpClient) { }

  getListing() : Listing{
    var listing = new Listing()
    this.httpClient.get(`${environment.tebexUrl}/listing`).subscribe({
      next: (data: any) => {
        data.categories.array.forEach((category : any) => {
          listing.categories.push(new Category(category.id,category.name))
          category.packages.array.forEach((product : any) => {
            listing.products.push(new Product(product.id,product.name,product.price,product.image,product.order))
          });
        });
      },
      error: (error) => {
        console.log(error)
      }
    })

    return listing;
  }
}
