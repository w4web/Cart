import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor( public layoutService: LayoutService ) {}

  ngOnInit(): void {

  }

}
