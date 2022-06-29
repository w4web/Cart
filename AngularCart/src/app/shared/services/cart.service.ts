import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  private apiUrl = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  _addToCart(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/cart/add', data, { observe: 'response' });
  }

}
