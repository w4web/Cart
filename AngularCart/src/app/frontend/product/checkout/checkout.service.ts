import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private apiUrl = environment.userApi;

  constructor(private http: HttpClient) {}

  getShippingAddressFields(): any {
    return this.http.get<any>('./assets/formFields/shippingAddress.json');
  }

  getShippingAddress(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/ShippingAddress');
  }

  setShippingAddress(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/ShippingAddress', data);
  }

}
