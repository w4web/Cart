import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ContentService {

  public callCategories$ = new BehaviorSubject(undefined);

  private apiContents = environment.adminApi.contents;
  private apiContentTypes = environment.adminApi.contentTypes;

  constructor( private http: HttpClient ) { }

  callCategories(): any {
    this.callCategories$.next(undefined);
  }

  allContents(contentTypeId: any): Observable<any> {
    return this.http.get<any>(`${this.apiContents}/${contentTypeId}`, { observe: 'response' });
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiContents}/add`, data, { observe: 'response' });
  }

  find(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiContents}/find/${id}`, { observe: 'response' });
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiContents}/edit/${id}`, data, { observe: 'response' });
  }

  delete(id: any): Observable<any> {
    return this.http.post(`${this.apiContents}/delete`, {'contentId': id}, { observe: 'response' });
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
    return this.http.get<any>('./assets/formFields/admin/content.json');
  }

  getContentTypeFields(): any {
    return this.http.get<any>('./assets/formFields/admin/contentType.json');
  }

}
