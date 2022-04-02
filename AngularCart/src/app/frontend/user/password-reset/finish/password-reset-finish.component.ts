import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'jhi-password-reset-finish',
  templateUrl: './password-reset-finish.component.html'
})
export class PasswordResetFinishComponent implements OnInit {
  passwordForm = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  initialized = false;
  error = false;
  success = false;
  key = '';

  constructor(public userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.userService.resetPasswordFields().subscribe((fields: any) => {
      this.passwordForm = new FormGroup({});
      this.fields = fields;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['key']) {
        this.key = params['key'];
      }
      this.initialized = true;
    });
  }

  finishReset(): void {
    this.error = false;
    const newPassword = this.passwordForm.get(['password'])!.value;

    this.userService.resetPassword(this.key, newPassword).subscribe(
      () => (this.success = true),
      () => (this.error = true)
    );
  }

  login(): void {
    this.router.navigate(['/user']);
  }
}
