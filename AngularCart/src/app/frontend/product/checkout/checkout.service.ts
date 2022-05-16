import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  accSelected = 1;

  private apiUrl = environment.userApi;

  constructor(private http: HttpClient) {}

  accChange(i:number) {
    this.accSelected = i;
  }

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
