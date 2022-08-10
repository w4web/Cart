import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ContentService } from 'src/app/shared/services/content.service';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  banner: any;
  products!: Product[];
  categories: any;

  constructor( public shopService: ShopService, public contentService: ContentService ) { }

  ngOnInit(): void {
    this.loadBanner();
    this.loadProducts();
    this.loadCategories();
  }

  loadBanner(): void {
    this.contentService.getContentBySlug('home-banner').subscribe((res: any) => {
      this.banner = res['body'];
    });
  }

  loadProducts(): void {
    this.shopService.allProducts().subscribe((res: any) => {
      this.products = res['body']['data'];
    });
  }

  loadCategories(): void {
    this.shopService.allCategories().subscribe((res: any) => {
      this.categories = res['body']['tree'];
      // console.log("this.categories", this.categories);
    });
  }

}
