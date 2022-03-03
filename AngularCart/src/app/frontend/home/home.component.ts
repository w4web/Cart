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

  categories: any = [
    {
      img: "./assets/images/category1.jpg",
      title: "Sports",
      subTitle: "Get 10% Off Your Order"
    },
    {
      img: "./assets/images/category2.jpg",
      title: "Shoes",
      subTitle: "Casual, Stylish & Trendy"
    },
    {
      img: "./assets/images/category3.jpg",
      title: "Watches",
      subTitle: "Source for luxury watches"
    },
    {
      img: "./assets/images/category4.jpg",
      title: "Furniture",
      subTitle: "Free Delivery in Town"
    },
    {
      img: "./assets/images/category5.jpg",
      title: "Glasses",
      subTitle: "Fashion Glasses Frames"
    }
  ];

  products: any = [
    {
      img: "./assets/images/product1.jpg",
      title: "Oversized V Sweater",
      price: "$45.00"
    },
    {
      img: "./assets/images/product2.jpg",
      title: "V-neck Blouse",
      price: "$65.00"
    },
    {
      img: "./assets/images/product3.jpg",
      title: "Puffy Sleeves",
      price: "$88.00"
    },
    {
      img: "./assets/images/product4.jpg",
      title: "Masculine Blazer",
      price: "$65.00",
      originalPrice: "$75.00"
    },
    {
      img: "./assets/images/product5.jpg",
      title: "High Rise Shorts",
      price: "$55.00",
      originalPrice: "$65.00"
    },
    {
      img: "./assets/images/product1.jpg",
      title: "Oversized V Sweater",
      price: "$45.00"
    },
    {
      img: "./assets/images/product2.jpg",
      title: "V-neck Blouse",
      price: "$65.00"
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
