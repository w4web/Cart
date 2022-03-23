import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products!: Product[];

  constructor( public productService: ProductService ) { }

  ngOnInit(): void {

    this.productService.allProducts().subscribe((res: any) => {
      this.products = res['data'];
    });

  }

  editProduct(product: any) {

  }

  deleteProduct(product: any) {
    
  }

}
