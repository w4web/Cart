import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html'
})

export class ProductFilterComponent implements OnInit {

  constructor( public productService: ProductService ) { }

  ngOnInit(): void {

  }

}
