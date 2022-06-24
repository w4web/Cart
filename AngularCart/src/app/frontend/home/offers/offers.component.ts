import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

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
  }

}
