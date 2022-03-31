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
    this.load();
  }

  load() {
    this.productService.allProducts().subscribe((res: any) => {
      this.products = res['data'];
      console.log(this.products);
    });
  }

  deleteProduct(product: any) {
    if (confirm("Are you sure to delete " + product.name)) {
      this.productService.delete(product._id).subscribe({
        next: (data) => {
          this.load();
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }

}
