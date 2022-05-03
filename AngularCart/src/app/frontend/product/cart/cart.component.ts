import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})

export class CartComponent implements OnInit {

  breadcrumbItems!: MenuItem[];
  breadcrumbHome!: MenuItem;

  constructor() { }

  ngOnInit(): void {
    this.breadcrumbItems = [
      {label: 'Products'},
      {label: 'All'}
    ];

    this.breadcrumbHome = {icon: 'pi pi-home', routerLink: '/'};
  }

}
