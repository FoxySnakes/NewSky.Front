import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TebexCategory, TebexListing } from 'src/app/models/StoreModel';
import { TebexService } from 'src/app/services/tebex.service';

@Component({
  selector: 'app-layout-store',
  templateUrl: './layout-store.component.html',
  styleUrls: ['./layout-store.component.scss']
})
export class LayoutStoreComponent implements OnInit {

  tebexListing = new TebexListing();
  currentCategory: TebexCategory | undefined;
  categoryName = '';

  constructor(private tebexService: TebexService,
    private router: Router) { }

  ngOnInit(): void {
    this.tebexService.getListing().subscribe({
      next: (listing) => {
        this.tebexListing = listing
        this.checkCategory();

        this.router.events.pipe(
          filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
          this.checkCategory();
        });
      }
    })
  }

  checkCategory() {
    this.categoryName = this.router.url.replace('/store', '').replace('/product/', '');
    this.currentCategory = this.tebexListing.categories.find(
      x => this.normalizeCategoryName(x.name) === this.categoryName
    );

    if (!this.currentCategory && this.tebexListing.categories.length > 0) {
      this.router.navigate(['/store/product', this.normalizeCategoryName(this.tebexListing.categories[0].name)]);
    }
    this.tebexService.setSelectedCategory(this.currentCategory)
  }

  normalizeCategoryName(categoryName: string) {
    categoryName = categoryName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    categoryName = categoryName.toLowerCase().replace(/\s/g, "-")
    return categoryName
  }
}
