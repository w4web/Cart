import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from 'src/app/shared/services/shop.service';
import { SeoService } from 'src/app/shared/services/seo.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  breadcrumbItems!: MenuItem[];
  breadcrumbHome!: MenuItem;

  page = 1;
  rows: any;
  totalRecords: any;

  products: any;
  category: any;

  sortOptions!: any[];
  sortKey!: any;
  sortOrder!: number;
  sortField!: string;

  constructor( 
    public shopService: ShopService, 
    private route: ActivatedRoute, 
    public seoService: SeoService, 
    private router: Router 
  ) {}

  ngOnInit(): void {

    // SEO ---
    
    const seoData = this.route.snapshot.data;
    this.seoService.updateTitle(seoData['title']);
    this.seoService.updateDescription(seoData['meta']['description']);

    // SEO End ---

    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      this.page = params['page'];
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
    this.shopService.allProducts(this.category, this.page).subscribe((res: any) => {
      this.products = res['body']['data'];
      this.rows = res['body']['productsPerPage'];
      this.totalRecords = res['body']['totalProducts'];
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

  onPriceChange(priceRange: any) {
    this.products = this.products.filter((product:any) => {
      return product.price >= priceRange[0]
          && product.price <= priceRange[1]
    });
  }

  paginate(event:any) {

    this.router.navigate(['/products'], {
      queryParams: {
        page: event.page+1,
        category: this.category
      },
    });

  }

}
