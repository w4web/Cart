import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { UserService } from '../user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MsgService } from 'src/app/shared/services/msg.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../user.component.scss']
})

export class LoginComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  constructor(
    private router: Router, 
    public authService: AuthService, 
    public userService: UserService, 
    public msgService: MsgService) {

    this.userService.getLoginFields().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
    });

  }

  ngOnInit() {}

  login() {

    this.authService.login(this.model)
      .subscribe({
        next: (res) => {
          if (res.body.token !== '') {
            this.authService.setUser(res.body);
            this.router.navigateByUrl('/');
          }
        },
        error: (err: any) => {
          this.msgService.errorHandle(err);
        }
      });
  }

  logout() {
    this.authService.logout();
  }

}
