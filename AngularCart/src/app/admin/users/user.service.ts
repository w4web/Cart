import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = environment.adminApi.users;

  constructor( private http: HttpClient ) { }

  allUsers(): Observable<any> {
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
    return this.http.post(`${this.apiUrl}/delete`, {'userId': id}, { observe: 'response' });
  }

  // Formly fileds

  getUserFields(): any {
    return this.http.get<any>('./assets/formFields/admin/user.json');
  }
  
}
