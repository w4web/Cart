import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private apiUrl = environment.adminApi.orders;

  constructor( private http: HttpClient ) { }

  allOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, { observe: 'response' });
  }

}
