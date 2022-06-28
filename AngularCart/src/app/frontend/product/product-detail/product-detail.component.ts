import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})

export class ProductDetailComponent implements OnInit {

  id: any;
  quantity: number = 1;

  breadcrumbItems!: MenuItem[];
  breadcrumbHome!: MenuItem;

  product!: any;
  category!: any;
  products!: any;

  constructor( public shopService: ShopService, private route: ActivatedRoute ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.loadSingle();
    });

    // breadcrumb

    this.breadcrumbItems = [
      {label: 'Products'},
      {label: 'All'}
    ];

    this.breadcrumbHome = {icon: 'pi pi-home', routerLink: '/'};

  }

  loadSingle(): void {
    this.shopService.findProduct(this.id).subscribe(res => {
      this.product = res['body']['data'];
      this.category = res['body']['data']['subCategory'];
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.shopService.allProducts(this.category).subscribe((res: any) => {
      this.products = res['body']['data'];
    });
  }

}
