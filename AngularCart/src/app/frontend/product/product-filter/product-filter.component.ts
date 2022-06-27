import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html'
})

export class ProductFilterComponent implements OnInit {

  rangeValues: number[] = [20,80];

  constructor( public shopService: ShopService ) { }

  ngOnInit(): void {

  }

}
