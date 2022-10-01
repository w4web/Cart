import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PrimeTableService {

  constructor( private http: HttpClient ) { }

  getAudits(): any {
    return this.http.get<any>('./assets/audits.json');
  }

}
