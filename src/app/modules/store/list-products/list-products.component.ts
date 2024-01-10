import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TebexCategory } from 'src/app/models/StoreModel';
import { TebexService } from 'src/app/services/tebex.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  category : TebexCategory | undefined

  constructor(private tebexService : TebexService){

  }

  ngOnInit(): void {
    this.tebexService.getSelectedCategory().subscribe({
      next: (selectedCategory) => {
        this.category = selectedCategory
      }
    })
  }
}
