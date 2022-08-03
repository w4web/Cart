import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ContentService {

  private apiContents = environment.adminApi.contents;
  private apiContentTypes = environment.adminApi.contentTypes;

  constructor( private http: HttpClient ) { }

  allContents(): Observable<any> {
    return this.http.get<any>(`${this.apiContents}`, { observe: 'response' });
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiContents}/add`, data, { observe: 'response' });
  }

  find(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiContents}/${id}`, { observe: 'response' });
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiContents}/edit/${id}`, data, { observe: 'response' });
  }

  delete(id: any): Observable<any> {
    return this.http.post(`${this.apiContents}/delete`, {'contentTypeId': id}, { observe: 'response' });
  }

  // Content types

  allContentTypes(): Observable<any> {
    return this.http.get<any>(`${this.apiContentTypes}`, { observe: 'response' });
  }

  createType(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiContentTypes}/add`, data, { observe: 'response' });
  }

  findType(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiContentTypes}/${id}`, { observe: 'response' });
  }

  updateType(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiContentTypes}/edit/${id}`, data, { observe: 'response' });
  }

  deleteType(id: any): Observable<any> {
    return this.http.post(`${this.apiContentTypes}/delete`, {'contentTypeId': id}, { observe: 'response' });
  }

  // Formly fileds

  getContentFields(): any {
    return this.http.get<any>('./assets/formFields/content.json');
  }

  getContentTypeFields(): any {
    return this.http.get<any>('./assets/formFields/contentType.json');
  }

}
