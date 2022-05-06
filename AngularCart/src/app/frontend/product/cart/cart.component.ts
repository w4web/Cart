import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})

export class CartComponent implements OnInit {

  breadcrumbItems!: MenuItem[];
  breadcrumbHome!: MenuItem;

  products: any = [
    {
      img: "./assets/images/product1.jpg",
      title: "Oversized V Sweater",
      quantity: 1,
      price: "$45.00"
    },
    {
      img: "./assets/images/product2.jpg",
      title: "V-neck Blouse",
      quantity: 2,
      price: "$65.00"
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.breadcrumbItems = [
      {label: 'Products'},
      {label: 'All'}
    ];

    this.breadcrumbHome = {icon: 'pi pi-home', routerLink: '/'};
  }

}
