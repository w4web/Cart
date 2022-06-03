import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html'
})
export class MyAccountComponent implements OnInit {

  user: any;

  constructor(public authService: AuthService) {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

}
