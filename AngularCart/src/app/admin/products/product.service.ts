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

  find(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/${id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/product/edit/${id}`, data, { observe: 'response' });
  }

  delete(id: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/product/delete`, {'productId': id}, { observe: 'response' });
  }

  // Formly fileds

  getProductFields(): any {
    return this.http.get<any>('./assets/productFields.json');
  }

}
