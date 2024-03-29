import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  private apiUrl = environment.myAccountApi;
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  editAccountFields(): any {
    return this.http.get<any>('./assets/formFields/editAccount.json');
  }

  getAccount(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, { observe: 'response' });
  }

  editAccount(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/edit`, data, { observe: 'response' });
  }

  editProfileImage(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/editProfileImage`, data, { observe: 'response' });
  }

  // -------------

  addressFields(): any {
    return this.http.get<any>('./assets/formFields/editAddress.json');
  }

  getAddress(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/address`, { observe: 'response' });
  }

  editAddress(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/address/edit`, data, { observe: 'response' });
  }

  // -------------

  changePasswordFields(): any {
    return this.http.get<any>('./assets/formFields/changePassword.json');
  }

  changePassword(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/changePassword`, data, { observe: 'response' });
  }

  // -------------

  // getOrders(): any {
  //   return this.http.get<any>('./assets/data/orders.json');
  // }

  _getOrders(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/orders', { observe: 'response' });
  }

}
