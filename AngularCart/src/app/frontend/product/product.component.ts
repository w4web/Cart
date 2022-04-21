import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
