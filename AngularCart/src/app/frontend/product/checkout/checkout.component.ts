import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})

export class CheckoutComponent implements OnInit {

  breadcrumbItems!: MenuItem[];
  breadcrumbHome!: MenuItem;

  constructor( public checkoutService: CheckoutService ) {}

  ngOnInit(): void {
    this.breadcrumbItems = [
      {label: 'Products'},
      {label: 'All'}
    ];

    this.breadcrumbHome = {icon: 'pi pi-home', routerLink: '/'};
  }

}
