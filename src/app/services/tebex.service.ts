import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Listing } from '../models/StoreModel';

@Injectable({
  providedIn: 'root'
})
export class TebexService {

  constructor(private httpClient : HttpClient) { }

  getListing() : Listing{
    var listing = new Listing()
    this.httpClient.get(`${environment.tebexUrl}/listing`).subscribe({
      next: (data) => {
        data
      },
      error: (error) => {

      }
    })

    return listing;
  }
}
