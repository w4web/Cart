import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MsgService } from 'src/app/shared/services/msg.service';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html'
})

export class ShippingAddressComponent implements OnInit {

  isEdit = true;

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  constructor( public checkoutService: CheckoutService, public msgService: MsgService ) {
    this.checkoutService.getShippingAddressFields().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
    });
  }

  ngOnInit(): void {
  }

  submit() {
    this.checkoutService.setShippingAddress( this.model ).subscribe({
      next: (data) => {
        this.msgService.msg('success', 'Saved!', 'Saved successfully!');
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

}