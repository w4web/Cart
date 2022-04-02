import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'password-reset-init',
  templateUrl: './password-reset-init.component.html'
})
export class PasswordResetInitComponent implements OnInit {

  resetRequestForm = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  success = false;

  constructor( public userService: UserService ) {
    this.userService.resetEmailField().subscribe((fields: any) => {
      this.resetRequestForm = new FormGroup({});
      this.fields = fields;
    });
  }

  ngOnInit(): void {}

  requestReset(): void {
    this.userService.resetByEmail(this.resetRequestForm.get(['email'])!.value).subscribe(() => (this.success = true));
  }

  previousState(): void {
    window.history.back();
  }
}
