import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  items!: MenuItem[];

  constructor(public layoutService: LayoutService) { }

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
        label: 'Orders',
        items: [
          {
            label: 'Order list',
            icon: 'pi pi-fw pi-list',
          }
        ]
      },
      {
        label: 'Sign out'
      }
    ]
  }

}
