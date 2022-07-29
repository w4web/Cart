import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  accSelected = 1;

  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  accChange(i:number) {
    this.accSelected = i;
  }

  _getCheckout(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/checkout', { observe: 'response' });
  }

  _createOrder(): Observable<any> {
    return this.http.post(this.apiUrl + '/create-order', { observe: 'response' });
  }

  _getOrders(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/orders', { observe: 'response' });
  }

}
