import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html'
})

export class PaymentComponent implements OnInit {

  paymentRequest:any = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '1.00',
      currencyCode: 'INR',
      countryCode: 'IN'
    }
  };

  constructor(private router: Router, public checkoutService: CheckoutService, public msgService: MsgService ) { }

  ngOnInit(): void {
  }

  onLoadPaymentData(event:any) {
    console.log('load payment data', event.detail);
    this.createOrder();
  }

  createOrder(): void {
    this.checkoutService._createOrder().subscribe({
      next: () => {
        this.router.navigate(['/products/orderConfirmation']);
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

}
