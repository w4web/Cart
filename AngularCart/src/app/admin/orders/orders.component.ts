import { Component, OnInit } from '@angular/core';
import { MsgService } from 'src/app/shared/services/msg.service';
import { OrderService } from './order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})

export class OrdersComponent implements OnInit {

  orders: any;
  first = 0;
  rows = 5;

  constructor( public orderService: OrderService, public msgService: MsgService ) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.orderService.allOrders().subscribe({
      next: (res: any) => {
        this.orders = res['body'];
        console.log("this.orders", res['body']);
        if(this.orders.length < 1) {
          this.msgService.msg('warn', 'Empty!', 'No orders available!');
        }
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

}
