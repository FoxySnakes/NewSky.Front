import { registerLocaleData } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PaginationResult } from 'src/app/models/FilterModel';
import { TebexSale } from 'src/app/models/StoreModel';
import { TebexService } from 'src/app/services/tebex.service';
import localeFr from '@angular/common/locales/fr';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderlistComponent implements OnInit, OnDestroy{

  salesPagined = new PaginationResult<TebexSale>()
  usernameSearchForm = new FormGroup({
    username : new FormControl('')
  })

  subs : Subscription[] = []

  constructor(private tebexService : TebexService){
    registerLocaleData(localeFr);
  }

  ngOnInit(): void {
    this.salesPagined.pageSizeOptions = [25]
    this.salesPagined.pageSize = 25

    this.getSales()
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe())
  }

  getSales(refresh : boolean = false){
    this.tebexService.getSales(this.salesPagined.pageNumber, refresh).subscribe({
      next: (result) => { 
        this.salesPagined.totalCount = result.totalCount
        this.salesPagined.items = result.sales
        console.log(this.salesPagined.items[0])
      }
    })
  }

  onPageChange(event: { pageNumber: number, pageSize: number }) {
    this.salesPagined.pageNumber = event.pageNumber
    this.getSales()
  }

}
