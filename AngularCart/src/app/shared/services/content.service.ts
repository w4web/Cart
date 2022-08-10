import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ContentService {

  private apiContents = environment.adminApi.contents;
  private apiComment = environment.adminApi.comments;

  constructor( private http: HttpClient ) { }

  // For loop content

  allContents(contentTypeId: any): Observable<any> {
    return this.http.get<any>(`${this.apiContents}?contentTypeId=${contentTypeId}`, { observe: 'response' });
  }

  find(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiContents}/${id}`, { observe: 'response' });
  }

  // For single content

  getContentBySlug(slug: any): Observable<any> {
    return this.http.get<any>(`${this.apiContents}/bySlug/${slug}`, { observe: 'response' });
  }

  // Comments

  allComments(contentId?: any): Observable<any> {
    return this.http.get<any>(`${this.apiComment}?contentId=${contentId}`, { observe: 'response' });
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiComment}/add`, data, { observe: 'response' });
  }

}
