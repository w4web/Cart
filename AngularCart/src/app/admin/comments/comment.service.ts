import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  public parentComment:any;
  public parentComment$ = new BehaviorSubject(undefined);

  private apiUrl = environment.adminApi.comments;

  constructor( private http: HttpClient ) { }

  getParentComment(): any {
    this.parentComment$.next(this.parentComment);
  }

  allComments(contentId?: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?contentId=${contentId}`, { observe: 'response' });
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
    return this.http.post(`${this.apiUrl}/delete`, {'commentId': id}, { observe: 'response' });
  }

  // Formly fileds

  getCommentFields(): any {
    return this.http.get<any>('./assets/formFields/comment.json');
  }

}
