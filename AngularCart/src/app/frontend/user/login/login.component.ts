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

  ngOnInit() {
    this.logout();
  }

  login() {

    this.authService.login(this.model)
      .subscribe({
        next: (res) => {
          this.setSession(res.data);
          this.router.navigateByUrl('/');
        },
        error: (err: any) => {
          this.msgService.errorHandle(err);
        }
      });
  }

  private setSession(authResult: any) {
    localStorage.setItem('email', authResult.email);
    localStorage.setItem('token', authResult.token);
  }

  logout() {
    this.authService.logout();
  }

}
