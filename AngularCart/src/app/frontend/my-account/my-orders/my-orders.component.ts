import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html'
})
export class MyOrdersComponent implements OnInit {

  orders: any = [
    {
      
    }
  ]
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
  }

}
