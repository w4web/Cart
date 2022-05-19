import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MsgService } from 'src/app/shared/services/msg.service';
import { MyAccountService } from '../my-account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})

export class ChangePasswordComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  constructor( public myAccountService: MyAccountService, public msgService: MsgService ) {
    this.myAccountService.changePasswordFields().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
    });
  }

  ngOnInit(): void {

  }

  submit() {

    this.myAccountService.changePassword( this.model ).subscribe({
      next: (data) => {
        this.msgService.msg('success', 'Success!', 'Your password changed!');
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
    
  }

}
