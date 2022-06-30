import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  public callCart$ = new BehaviorSubject(undefined);

  private apiUrl = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  callCart(): any {
    this.callCart$.next(undefined);
  }

  _getCart(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/cart', { observe: 'response' });
  }

  _cartQuantity(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/cartQuantity', { observe: 'response' });
  }

  _addToCart(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/cart/add', data, { observe: 'response' });
  }

  _editQuantity(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/cart/editQuantity', data, { observe: 'response' });
  }

  _cartDeleteProduct(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/cart/delete', data, { observe: 'response' });
  }

}
