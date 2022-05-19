import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MsgService } from 'src/app/shared/services/msg.service';
import { MyAccountService } from '../my-account.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html'
})

export class EditAccountComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  constructor( public myAccountService: MyAccountService, public msgService: MsgService ) {
    this.myAccountService.editAccountFields().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
    });
  }

  ngOnInit(): void {

  }

  submit() {

    this.myAccountService.editAccount( this.model ).subscribe({
      next: (data) => {
        this.msgService.msg('success', 'Success!', 'Successfully edited!');
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
    
  }

}
