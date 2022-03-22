import { Component, OnInit } from '@angular/core';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})

export class LayoutComponent implements OnInit {

  constructor( public layoutService: LayoutService ) { }

  ngOnInit(): void {
    
  }

}
