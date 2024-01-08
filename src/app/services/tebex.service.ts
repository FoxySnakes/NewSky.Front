import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TebexCategory, TebexListing, TebexPackage } from '../models/StoreModel';
import { ApiService } from './api.service';
import { NotifierService } from 'angular-notifier';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TebexService {

  private urlHeadlessApi = "https://headless.tebex.io"
  private webStoreIdentifier = "rrx1-9e82a64dc20135a1c070e4602c5c8176c0e945a0"

  constructor(private http: HttpClient) { }

  getListing(): Observable<TebexListing> {
    // return this.http.get<any>(`${this.urlHeadlessApi}/api/accounts/${this.webStoreIdentifier}/categories?includePackages=1`).pipe(
    //   map(response => {
    //     const data = response.data;
    //     const listing = new TebexListing();

    //     data.forEach((category: any) => {
    //       const tebexCategory = new TebexCategory();
    //       tebexCategory.id = category.id;
    //       tebexCategory.name = category.name;
    //       tebexCategory.description = category.description;
    //       tebexCategory.order = category.order;

    //       category.packages.forEach((packageCategory: any) => {
    //         const tebexPackage = new TebexPackage();
    //         tebexPackage.id = packageCategory.id;
    //         tebexPackage.name = packageCategory.name;
    //         tebexPackage.description = packageCategory.description;
    //         tebexPackage.imageUrl = packageCategory.image;
    //         tebexPackage.basePrice = packageCategory.base_price;
    //         tebexPackage.salesPrice = packageCategory.sales_tax;
    //         tebexPackage.totalPrice = packageCategory.total_price;
    //         tebexPackage.currency = packageCategory.currency;
    //         tebexPackage.discount = packageCategory.discount;
    //         tebexPackage.giftingEnable = packageCategory.disable_gifting;
    //         tebexPackage.creationDate = packageCategory.created_at ? new Date(packageCategory.created_at!) : null;
    //         tebexPackage.expirationDate = packageCategory.expiration_date ? new Date(packageCategory.expiration_date) : new Date('9999-12-31T23:59:59');

    //         tebexCategory.packages.push(tebexPackage);
    //       });

    //       listing.categories.push(tebexCategory);
    //     });
    //     return listing;
    //   })
    // )
    return of({
      "categories": [
          {
              "id": 2416400,
              "name": "Grades",
              "packages": [
                  {
                      "id": 5949559,
                      "name": "Vip",
                      "description": "<p>vip access for player in minecraft server</p>",
                      "basePrice": 4.99,
                      "salesPrice": 1,
                      "totalPrice": 5.99,
                      "currency": "EUR",
                      "discount": 0,
                      "giftingEnable": false,
                      "creationDate": new Date("2023-10-12T09:24:20.000Z"),
                      "expirationDate": new Date("9999-12-31T22:59:59.000Z"),
                      "imageUrl": "https://dunb17ur4ymx4.cloudfront.net/packages/images/6d649f5599f911ade041441e9fe198ccda03e206.png"
                  },
                  {
                      "id": 6070657,
                      "name": "VIP+",
                      "description": "<p>lorem ipsum do test dsqjdhqsuhduqshddisqdopsq</p>",
                      "basePrice": 15.99,
                      "salesPrice": 3.2,
                      "totalPrice": 19.19,
                      "currency": "EUR",
                      "discount": 0,
                      "giftingEnable": false,
                      "creationDate": new Date("2024-01-07T18:30:52.000Z"),
                      "expirationDate": new Date("9999-12-31T22:59:59.000Z"),
                      "imageUrl": null
                  }
              ],
              "order": 0,
              "description": ""
          },
          {
              "id": 2585211,
              "name": "Produit",
              "packages": [],
              "order": 1,
              "description": ""
          },
          {
              "id": 2585217,
              "name": "Tokens",
              "packages": [
                  {
                      "id": 6070664,
                      "name": "500 tokens",
                      "description": "<p>lorem ipsum do test dsqjdhqsuhduqshddisqdopsq</p>",
                      "basePrice": 4.99,
                      "salesPrice": 1,
                      "totalPrice": 5.99,
                      "currency": "EUR",
                      "discount": 0,
                      "giftingEnable": false,
                      "creationDate": new Date("2024-01-07T18:32:40.000Z"),
                      "expirationDate": new Date("9999-12-31T22:59:59.000Z"),
                      "imageUrl": null
                  },
                  {
                      "id": 6070666,
                      "name": "1500 tokens",
                      "description": "<p>lorem ipsum do test dsqjdhqsuhduqshddisqdopsq</p>",
                      "basePrice": 15.99,
                      "salesPrice": 3.2,
                      "totalPrice": 19.19,
                      "currency": "EUR",
                      "discount": 0,
                      "giftingEnable": false,
                      "creationDate": new Date("2024-01-07T18:34:29.000Z"),
                      "expirationDate": new Date("9999-12-31T22:59:59.000Z"),
                      "imageUrl": null
                  }
              ],
              "order": 2,
              "description": ""
          },
          {
              "id": 2585222,
              "name": "Abonnement",
              "packages": [
                  {
                      "id": 6070667,
                      "name": "Pass de combat",
                      "description": "<p>lorem ipsum do test dsqjdhqsuhduqshddisqdopsq</p>",
                      "basePrice": 10.99,
                      "salesPrice": 2.2,
                      "totalPrice": 13.19,
                      "currency": "EUR",
                      "discount": 0,
                      "giftingEnable": false,
                      "creationDate": new Date("2024-01-07T18:35:36.000Z"),
                      "expirationDate": new Date("9999-12-31T22:59:59.000Z"),
                      "imageUrl": null
                  }
              ],
              "order": 3,
              "description": ""
          }
      ]
  })
  }
}