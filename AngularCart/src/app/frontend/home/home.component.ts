import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  allProducts!: MenuItem[];

  offers: any = [
    {
      img: "./assets/images/offer1.jpg"
    },
    {
      img: "./assets/images/offer2.jpg"
    },
    {
      img: "./assets/images/offer3.jpg"
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.allProducts = [
      {
        label: 'Deals of the Day',
        icon: 'pi pi-fw pi-file',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            { label: 'Project' },
            { label: 'Other' },
          ]
        },
        { label: 'Open' },
        { label: 'Quit' }
        ]
      },
      {
        label: 'Sports & Health',
        icon: 'pi pi-fw pi-file',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Home & Lifestyle',
        icon: 'pi pi-fw pi-file',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Womens Fashion',
        icon: 'pi pi-fw pi-file',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Watches & Accessories',
        icon: 'pi pi-fw pi-file',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Automotive & Motorbike',
        icon: 'pi pi-fw pi-file',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      }
    ];
  }

}
