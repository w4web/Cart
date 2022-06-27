import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ShopService {

  sidebar = false;

  private apiUrl = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  // Product

  allProducts(category?:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products?category=${category}`, { observe: 'response' });
  }

  findProduct(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${id}`, { observe: 'response' });
  }

  // Category
  
  allCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categories`, { observe: 'response' });
  }

  findCategory(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categories/${id}`, { observe: 'response' });
  }

}
