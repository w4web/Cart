import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ContentService {

  private apiContents = environment.adminApi.contents;

  constructor( private http: HttpClient ) { }

  allContents(contentTypeId: any): Observable<any> {
    return this.http.get<any>(`${this.apiContents}?contentTypeId=${contentTypeId}`, { observe: 'response' });
  }

  find(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiContents}/${id}`, { observe: 'response' });
  }

}
