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
        items: [
          {
            label: 'Order list',
            icon: 'pi pi-fw pi-list',
            routerLink: '/admin/order'
          }
        ]
      },
      {
        label: 'Logout',
        command: (event) => {
          this.authService.logout();
        }
      }
    ]
  }

}
