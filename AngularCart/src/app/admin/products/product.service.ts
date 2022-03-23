import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.adminApi;

  constructor( private http: HttpClient ) { }

  allProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/product/add`, data, { observe: 'response' });
  }

  // Formly fileds

  getProductFields(): any {
    return this.http.get<any>('./assets/productFields.json');
  }

}
