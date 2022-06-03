import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AuthService } from 'src/app/shared/services/auth.service';
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

  constructor(
    public myAccountService: MyAccountService, 
    public msgService: MsgService, 
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.myAccountService.editAccountFields().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
      this.load();
    });
  }

  load(): void {
    this.myAccountService.getAccount().subscribe(res => {
      const user = res['body'];
      this.model = {
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  }

  submit(): void {

    this.myAccountService.editAccount( this.model ).subscribe({
      next: (res) => {
        this.resetUser(res['body']);
        this.msgService.msg('success', 'Success!', 'Account updated!');
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
    
  }

  resetUser(data:any): any {
    
    const user = this.authService.getUser();
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    this.authService.setUser(user);

  }

}
