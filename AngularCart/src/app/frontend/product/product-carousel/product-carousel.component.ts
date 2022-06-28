import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html'
})

export class ProductCarouselComponent implements OnInit {

  @Input() products!: Product[];

  constructor() { }

  ngOnInit(): void {
  }

}
