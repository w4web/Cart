import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MyAccountService } from '../my-account.service';
import { MsgService } from 'src/app/shared/services/msg.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html'
})

export class EditAddressComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  constructor( public myAccountService: MyAccountService, public msgService: MsgService ) { }

  ngOnInit(): void {
    this.myAccountService.addressFields().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
      this.load();
    });
  }

  load(): void {
    this.myAccountService.getAddress().subscribe(res => {
      this.model = res['body'];
    });
  }

  submit() {
    this.myAccountService.editAddress( this.model ).subscribe({
      next: (data) => {
        this.msgService.msg('success', 'Saved!', 'Saved successfully!');
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

}
