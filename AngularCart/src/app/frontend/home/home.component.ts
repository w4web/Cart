import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  public products!: Product[];
  public categories: any;

  constructor( public shopService: ShopService ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.shopService.allProducts().subscribe((res: any) => {
      this.products = res['body']['data'];
    });
  }

  loadCategories(): void {
    this.shopService.allCategories().subscribe((res: any) => {
      this.categories = res['body']['tree'];
    });
  }

}
