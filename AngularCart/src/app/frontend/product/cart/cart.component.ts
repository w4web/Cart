import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CartService } from 'src/app/shared/services/cart.service';
import { MsgService } from 'src/app/shared/services/msg.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})

export class CartComponent implements OnInit {

  breadcrumbItems!: MenuItem[];
  breadcrumbHome!: MenuItem;

  products!: any;
  totalSum!: any;
  quaDisabled = false;

  constructor( public cartService: CartService, public msgService: MsgService ) { }

  ngOnInit(): void {

    this.loadCart();

    // breadcrumb

    this.breadcrumbItems = [
      {label: 'Products'},
      {label: 'All'}
    ];

    this.breadcrumbHome = {icon: 'pi pi-home', routerLink: '/'};

  }

  loadCart(): void {
    this.cartService._getCart().subscribe((res: any) => {
      this.products = res['body']['products'];
      this.totalSum = res['body']['totalSum'];
      console.log("Cart items.", res['body']);
    });
  }

  editQuantity(productId:any, quantity:number): void {

    this.quaDisabled = true;

    this.cartService._editQuantity({productId: productId, quantity: quantity}).subscribe({
      next: () => {
        this.msgService.msg('success', 'Quantity updated!', '');
        this.loadCart();
        this.cartService.callCart();
        this.quaDisabled = false;
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
        this.quaDisabled = false;
      }
    });

  }

  cartDeleteProduct(productId:any): void {

    this.cartService._cartDeleteProduct({productId: productId}).subscribe({
      next: () => {
        this.msgService.msg('success', 'Product removed from cart!', '');
        this.loadCart();
        this.cartService.callCart();
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });

  }

}
