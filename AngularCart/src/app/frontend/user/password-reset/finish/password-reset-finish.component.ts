import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
import { MsgService } from 'src/app/shared/services/msg.service';

@Component({
  selector: 'jhi-password-reset-finish',
  templateUrl: './password-reset-finish.component.html',
  styleUrls: ['../../user.component.scss']
})

export class PasswordResetFinishComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  initialized = false;
  key = '';

  constructor(
    public userService: UserService, 
    private route: ActivatedRoute, 
    private router: Router,
    public msgService: MsgService
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      if (params['key']) {
        this.key = params['key'];
      }
      this.initialized = true;
    });

    this.userService.resetPasswordFields().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
    });
    
  }

  finishReset(): void {
    const newPassword = this.form.get(['password'])!.value;

    this.userService.resetPassword(this.key, newPassword).subscribe({
      next: () => {
        this.msgService.msg('success', 'Success!', 'Password reset successfully!');
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

  login(): void {
    this.router.navigate(['/user']);
  }
}
