import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

  megaMenu!: MegaMenuItem[];
  accountItems!: MenuItem[];
  isAuthenticated: boolean = false;
  user: any;
  categories: any;
  cartQuantity: any = 0;

  constructor(public shopService: ShopService, public cartService: CartService, public authService: AuthService) {
    this.authService.user$.subscribe(user => {
      this.isAuthenticated = user ? true : false;
      this.user = user;
    });
  }

  ngOnInit(): void {

    this.accountItems = [
      {
        label: 'Admin panel',
        icon: 'pi pi-cog',
        routerLink: '/admin',
        visible: (this.user && this.user.role == 'admin') ? true : false
      },
      {
        label: 'Account',
        icon: 'pi pi-user',
        routerLink: '/myAccount'
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: (event) => {
          this.authService.logout();
        }
      }
    ];

    this.megaMenu = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/home'
      },
      {
        label: 'Shop',
        icon: 'pi pi-fw pi-tag',
        items: []
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
        label: 'Pages',
        icon: 'pi pi-fw pi-book',
        items: [
          [
            {
              label: 'content pages',
              items: [
                {
                  label: 'content page 1',
                  routerLink: '/'
                }, 
                {
                  label: 'content page 2',
                  routerLink: '/'
                }
              ]
            }
          ]
        ]
      },
      {
        label: 'Blogs',
        icon: 'pi pi-fw pi-book',
        routerLink: '/blogs'
      }
    ];

    this.loadCategories();
    this.callCart();

  }

  loadCategories(): any {

    this.shopService.allCategories().subscribe((res: any) => {

      this.categories = res['body']['tree'];

      for(let i = 0; i < this.categories.length; i++){

          this.categories[i].label = this.categories[i]['name'];

          if (this.categories[i].children.length > 0) {

            this.categories[i].items = this.categories[i]['children'];

            for(let j = 0; j < this.categories[i].items.length; j++){

              this.categories[i].items[j].label = this.categories[i].items[j]['name'];
              this.categories[i].items[j].routerLink = '/products';
              this.categories[i].items[j].queryParams = {category: this.categories[i].items[j]['slug']};

            }

          }
      }

      this.megaMenu[1].items = [this.categories];

    });
    
  }

  callCart(): void {
    this.cartService.callCart$.subscribe(() => 
    {
      this.cartService._cartQuantity().subscribe((res: any) => {
        this.cartQuantity = res['body']['totalQuantity'];
      });
    });
  }



}
