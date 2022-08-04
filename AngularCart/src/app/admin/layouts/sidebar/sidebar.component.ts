import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContentType } from 'src/app/shared/models/contentType.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ContentService } from '../../contents/content.service';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  items!: MenuItem[];

  constructor(
    public layoutService: LayoutService,
    public authService: AuthService,
    public contentService: ContentService
  ) { }

  ngOnInit(): void {

    this.items = [
      {
        label: 'Products',
        icon: 'pi pi-fw pi-th-large',
        items: [
          {
            label: 'Product list',
            icon: 'pi pi-fw pi-list',
            routerLink: '/admin/product'
          },
          {
            label: 'Add new',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/admin/product/add'
          }
        ]
      },
      {
        label: 'Categories',
        icon: 'pi pi-fw pi-sitemap',
        items: [
          {
            label: 'Category list',
            icon: 'pi pi-fw pi-list',
            routerLink: '/admin/category'
          },
          {
            label: 'Add new',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/admin/category/add'
          }
        ]
      },
      {
        label: 'Orders',
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          {
            label: 'Order list',
            icon: 'pi pi-fw pi-list',
            routerLink: '/admin/order'
          }
        ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'User list',
            icon: 'pi pi-fw pi-list',
            routerLink: '/admin/user'
          },
          {
            label: 'Add new',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/admin/user/add'
          }
        ]
      },
      {
        label: 'Content types',
        icon: 'pi pi-fw pi-sitemap',
        items: []
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: (event) => {
          this.authService.logout();
        }
      }
    ];

    this.loadCategories();
  }

  loadCategories(): any {

    this.contentService.callCategories$.subscribe(() => 
    {

      this.contentService.allContentTypes().subscribe((res: any) => {

        let contentTypes = res['body'];

        for(let i = 0; i < contentTypes.length; i++){

          contentTypes[i].label = contentTypes[i]['name'];
          contentTypes[i].routerLink = "/admin/content/"+contentTypes[i]['_id'];

        }

        contentTypes.push(
          {
            label: 'Add new type',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/admin/content/addType',
            style: {'border-top': '1px solid #DDD', 'margin-top': '5px'}
          },
          {
            icon: 'pi pi-fw pi-refresh',
            styleClass: 'icon-refrash'
          },
          {
            label: 'Un categorized',
            icon: 'pi pi-fw pi-book',
            routerLink: '/admin/content',
            style: {'border-top': '1px solid #DDD', 'margin-top': '5px'}
          }
        )

        this.items.find(i => i.label === 'Content types')!.items = contentTypes;

        console.log("Content types", contentTypes);

      });

    });

  }

}
