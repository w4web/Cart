import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MsgService } from 'src/app/shared/services/msg.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'password-reset-init',
  templateUrl: './password-reset-init.component.html',
  styleUrls: ['../../user.component.scss']
})

export class PasswordResetInitComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  constructor(public userService: UserService, public msgService: MsgService) {
    this.userService.resetEmailField().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
    });
  }

  ngOnInit(): void { }

  requestReset(): void {
    this.userService.resetByEmail(this.form.get(['email'])!.value).subscribe({
      next: () => {
        this.msgService.msg('success', 'Email sent!', 'Please check your email to reset password!');
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

}
