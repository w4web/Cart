import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MyAccountService } from 'src/app/frontend/my-account/my-account.service';
import { MsgService } from 'src/app/shared/services/msg.service';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html'
})

export class ShippingAddressComponent implements OnInit {

  address: any;
  isEdit = false;

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  constructor( 
    public checkoutService: CheckoutService,
    public myAccountService: MyAccountService, 
    public msgService: MsgService 
  ) { }

  ngOnInit(): void {
    this.myAccountService.addressFields().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
      this.load();
    });
  }

  load(): void {
    this.myAccountService.getAddress().subscribe({
      next: (res) => {
        this.address = res['body'];
        this.model = res['body'];
        if(this.address) {
          if (this.address.street == undefined || this.address.street == "") {
            this.isEdit = true;
          }
        }
      },
      error: (err: any) => {
        // console.log("error.....", err);
        if(err.status == 409) {
          this.isEdit = true;
        }
      }
    });
  }

  submit() {
    this.myAccountService.editAddress( this.model ).subscribe({
      next: (data) => {
        this.msgService.msg('success', 'Saved!', 'Saved successfully!', 2000);
        this.isEdit = false;
        this.load();
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

}
