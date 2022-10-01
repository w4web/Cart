import { Component, OnInit } from '@angular/core';
import { PrimeTableService } from './prime-table.service';

@Component({
  selector: 'app-prime-table',
  templateUrl: './prime-table.component.html',
  styleUrls: ['./prime-table.component.scss']
})

export class PrimeTableComponent implements OnInit {

  audits!: any[];

  constructor( public primeTableService: PrimeTableService ) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.primeTableService.getAudits().subscribe({
      next: (res: any) => {
        this.audits = res;
      },
      error: (err: any) => {
        console.log("err", err);
      }
    });
  }

}
