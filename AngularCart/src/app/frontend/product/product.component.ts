import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  breadcrumbItems!: MenuItem[];
  breadcrumbHome!: MenuItem;

  products: any;
  category: any;

  sortOptions!: any[];
  sortKey!: any;
  sortOrder!: number;
  sortField!: string;

  constructor( public shopService: ShopService, private route: ActivatedRoute ) {
    
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      this.loadProducts();
    });

    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
    ];

    this.breadcrumbItems = [
      {label: 'Products'},
      {label: 'All'}
    ];

    this.breadcrumbHome = {icon: 'pi pi-home', routerLink: '/'};

  }

  loadProducts(): void {
    this.shopService.allProducts(this.category).subscribe((res: any) => {
      this.products = res['body']['data'];
    });
  }

  onSortChange(event:any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

}
