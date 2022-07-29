import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MsgService } from 'src/app/shared/services/msg.service';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})

export class CheckoutComponent implements OnInit {

  products!: any;
  totalSum!: any;
  tax!: any;
  shippingCharge = 40;

  breadcrumbItems!: MenuItem[];
  breadcrumbHome!: MenuItem;

  constructor( 
    public checkoutService: CheckoutService, 
    public msgService: MsgService 
  ) {}

  ngOnInit(): void {

    this.checkout();

    this.breadcrumbItems = [
      {label: 'Products'},
      {label: 'All'}
    ];

    this.breadcrumbHome = {icon: 'pi pi-home', routerLink: '/'};

  }

  checkout(): void {
    this.checkoutService._getCheckout().subscribe((res: any) => {
      this.products = res['body']['products'];
      this.totalSum = res['body']['totalSum'];
      this.tax = (this.totalSum*10)/100;
      console.log("Cart items.", res['body']);
    });
  }

}
