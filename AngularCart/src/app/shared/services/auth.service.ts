import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private apiUrl = environment.userApi;

  constructor( private http: HttpClient ) { }

  login(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/login', data);
  }

  logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  }

  isAuthenticated():any {
    if (localStorage.getItem('token') == "" || localStorage.getItem('token') == undefined) {
      return false;
    } else {
      return true;
    }
  }
}
