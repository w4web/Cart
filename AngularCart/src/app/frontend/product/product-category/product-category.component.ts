import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html'
})

export class ProductCategoryComponent implements OnInit {

  categories!: TreeNode[];
  selectedCategory!: TreeNode;

  constructor( public shopService: ShopService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {

    this.loadCategories();

  }

  loadCategories(): any {

    this.shopService.allCategories().subscribe((res: any) => {

      let categories = res['body']['tree'];

      for(let i = 0; i < categories.length; i++){

          categories[i].label = categories[i]['name'];

          if (categories[i].children.length > 0) {

            for(let j = 0; j < categories[i].children.length; j++){

              categories[i].children[j].label = categories[i].children[j]['name'];
              categories[i].children[j].routerLink = '/products';
              categories[i].children[j].queryParams = {category: categories[i].children[j]['slug']};

            }

          }
      }

      this.categories = categories;

    });

  }

  nodeSelect(event:any) {
    if (event.node.routerLink) {
      this.router.navigate([ event.node.routerLink ], { queryParams: event.node.queryParams });
    }
  }

}
