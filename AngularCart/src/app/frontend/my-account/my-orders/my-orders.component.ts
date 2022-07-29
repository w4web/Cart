import { Component, OnInit } from '@angular/core';
import { MyAccountService } from '../my-account.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html'
})

export class MyOrdersComponent implements OnInit {

  orders: any;

  constructor( public myAccountService: MyAccountService ) { }

  ngOnInit(): void {

    this.getOrders();

  }

  getOrders(): void {
    this.myAccountService._getOrders().subscribe((res: any) => {
      this.orders = res['body'];
      console.log("Order items.", res['body']);
    });
  }

}
