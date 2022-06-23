import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public parentCategory:any;
  public parentCategory$ = new BehaviorSubject(undefined);

  private apiUrl = environment.adminApi.categories;

  constructor( private http: HttpClient ) { }

  getParentCategory(): any {
    this.parentCategory$.next(this.parentCategory);
  }

  allCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, { observe: 'response' });
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, data, { observe: 'response' });
  }

  find(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { observe: 'response' });
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/edit/${id}`, data, { observe: 'response' });
  }

  delete(id: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete`, {'categoryId': id}, { observe: 'response' });
  }

  // Formly fileds

  getCategoryFields(): any {
    return this.http.get<any>('./assets/formFields/category.json');
  }

}
