import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

  items!: MenuItem[];
  accountItems!: MenuItem[];
  isAuthenticated: boolean = false;
  user: any;

  constructor(public authService: AuthService) {
    this.authService.user$.subscribe(user => {
      this.isAuthenticated = user ? true : false;
      this.user = user;
    });
  }

  ngOnInit(): void {

    this.accountItems = [
      {
        label: 'Account',
        icon: 'pi pi-user',
        routerLink: '/'
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: (event) => {
          this.authService.logout();
        }
      }
    ];

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/home'
      },
      {
        label: 'Products',
        icon: 'pi pi-fw pi-tag',
        routerLink: '/products'
      },
      {
        label: 'About us',
        icon: 'pi pi-fw pi-info-circle',
        routerLink: '/'
      },
      {
        label: 'Contact us',
        icon: 'pi pi-fw pi-phone',
        routerLink: '/'
      },
      {
        label: 'help',
        icon: 'pi pi-fw pi-question-circle',
        routerLink: '/'
      }
    ];
  }

}
