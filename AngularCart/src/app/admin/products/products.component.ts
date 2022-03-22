import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products!: Product[];

  cols!: any[];

  constructor( public productService: ProductService ) { }

  ngOnInit(): void {

    this.productService.allProducts().subscribe((data: any) => {
      this.products = data;
    });

    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' }
    ];

  }

}
