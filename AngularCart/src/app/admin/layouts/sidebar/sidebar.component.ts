import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  items!: MenuItem[];

  constructor(
    public layoutService: LayoutService,
    public authService: AuthService
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
        label: 'Content',
        icon: 'pi pi-fw pi-book',
        routerLink: '/admin/content'
      },
      {
        label: 'Content types',
        icon: 'pi pi-fw pi-sitemap',
        items: [
          {
            label: 'Home carousel',
            icon: 'pi pi-fw pi-images',
            routerLink: '/admin/contentType/home_carousel'
          },
          {
            label: 'Add new',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/admin/contentType/add'
          }
        ]
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: (event) => {
          this.authService.logout();
        }
      }
    ]
  }

}
