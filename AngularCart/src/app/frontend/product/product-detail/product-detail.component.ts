import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})

export class ProductDetailComponent implements OnInit {

  quantity:number = 1;

  breadcrumbItems!: MenuItem[];
  breadcrumbHome!: MenuItem;

  products: any = [
    {
      img: "./assets/images/product1.jpg",
      title: "Oversized V Sweater",
      price: "$45.00"
    },
    {
      img: "./assets/images/product2.jpg",
      title: "V-neck Blouse",
      price: "$65.00"
    },
    {
      img: "./assets/images/product3.jpg",
      title: "Puffy Sleeves",
      price: "$88.00"
    },
    {
      img: "./assets/images/product4.jpg",
      title: "Masculine Blazer",
      price: "$65.00",
      originalPrice: "$75.00"
    },
    {
      img: "./assets/images/product5.jpg",
      title: "High Rise Shorts",
      price: "$55.00",
      originalPrice: "$65.00"
    },
    {
      img: "./assets/images/product1.jpg",
      title: "Oversized V Sweater",
      price: "$45.00"
    },
    {
      img: "./assets/images/product2.jpg",
      title: "V-neck Blouse",
      price: "$65.00"
    }
  ];

  // productImgThumbs: any = [
  //   {
  //     img: "./assets/images/product1.jpg",
  //   },
  //   {
  //     img: "./assets/images/product2.jpg",
  //   },
  //   {
  //     img: "./assets/images/product3.jpg",
  //   },
  //   {
  //     img: "./assets/images/product4.jpg",
  //   },
  //   {
  //     img: "./assets/images/product5.jpg",
  //   }
  // ];

  constructor() { }

  ngOnInit(): void {

    this.breadcrumbItems = [
      {label: 'Products'},
      {label: 'All'}
    ];

    this.breadcrumbHome = {icon: 'pi pi-home', routerLink: '/'};

  }

}
