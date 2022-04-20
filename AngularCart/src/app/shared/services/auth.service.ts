import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import * as utf8 from 'crypto-js/enc-utf8';
import * as AES from 'crypto-js/aes';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private apiUrl = environment.userApi;
  private apiKey = environment.apiKey;

  public user: any;
  public user$ = new BehaviorSubject(undefined);

  constructor( private http: HttpClient, private router: Router ) {
    this.getUser();
  }

  // Set to sessionStorage **********

  setUser(userData: any) {

    const encrypted = AES.encrypt(
      JSON.stringify(userData), this.apiKey
    ).toString();

    sessionStorage.setItem('0', encrypted);

    this.user = userData;
    this.user$.next(this.user);

  }

  // Get from sessionStorage **********

  getUser() {

    if (sessionStorage.getItem('0')) {
      const userdata = sessionStorage.getItem('0');
      try {
        this.user = JSON.parse(
          AES.decrypt(userdata!, this.apiKey).toString(utf8)
        );
      } catch (err) {
        this.user = undefined;
        sessionStorage.removeItem('0');
      }
    } else {
      this.user = undefined;
      sessionStorage.removeItem('0');
    }

    this.user$.next(this.user);
    return this.user;

  }

  // Remove from sessionStorage **********

  removeUser() {
    this.user = undefined;
    this.user$.next(this.user);
    sessionStorage.removeItem('0');
  }

  callUser() {
    this.user$.next(this.user);
  }

  isAuthenticated() :any {
    if (sessionStorage.getItem('0') == "" || sessionStorage.getItem('0') == undefined) {
      return false;
    } else {
      return true;
    }
  }

  /* ------- API ------- */

  login(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/login', data);
  }

  logout() {
    this.removeUser();
    this.router.navigate(['/user/login']);
  }

}
