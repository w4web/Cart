import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html'
})

export class ProductFilterComponent implements OnInit {

  rangeValues: number[] = [100, 1000];
  @Output() changePrice = new EventEmitter<any>();

  constructor( public shopService: ShopService ) { }

  ngOnInit(): void {}

  setPriceRange() {
    this.changePrice.next(this.rangeValues);
  }

}
