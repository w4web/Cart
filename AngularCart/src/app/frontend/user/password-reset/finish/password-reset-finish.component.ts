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

  id:any;
  token:any;

  constructor(
    public userService: UserService, 
    private route: ActivatedRoute, 
    private router: Router,
    public msgService: MsgService
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    this.token = this.route.snapshot.paramMap.get('token');

    this.userService.resetPasswordFields().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
    });
    
  }

  finishReset(): void {

    this.userService.resetPassword(this.id, this.token, this.model).subscribe({
      next: (res) => {
        if(res.status == 200) {
          // this.msgService.msg('success', res.body.summary, res.body.detail);
          this.router.navigate(['/user/passwordResetSuccess']);
        }
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });

  }

}
