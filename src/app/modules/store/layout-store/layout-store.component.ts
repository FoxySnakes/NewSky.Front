import { Component, OnInit } from '@angular/core';
import { Listing } from 'src/app/models/StoreModel';
import { TebexService } from 'src/app/services/tebex.service';

@Component({
  selector: 'app-layout-store',
  templateUrl: './layout-store.component.html',
  styleUrls: ['./layout-store.component.scss']
})
export class LayoutStoreComponent implements OnInit{

  listing = new Listing()
  constructor(private tebexService : TebexService){}

  ngOnInit(): void {
    this.listing = this.tebexService.getListing()
  }
}
