import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html'
})

export class BrandsComponent implements OnInit {

  brands: any = [
    {
      img: "./assets/images/client-logos-1.png",
    },
    {
      img: "./assets/images/client-logos-2.png",
    },
    {
      img: "./assets/images/client-logos-3.png",
    },
    {
      img: "./assets/images/client-logos-4.png",
    },
    {
      img: "./assets/images/client-logos-5.png",
    },
    {
      img: "./assets/images/client-logos-6.png",
    },
    {
      img: "./assets/images/client-logos-7.png",
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
