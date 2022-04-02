import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.userApi;
  public forgotPass!:boolean;

  constructor(private http: HttpClient) {}

  getLoginFields(): any {
    return this.http.get<any>('./assets/loginFormFields.json');
  }

  getRegisterFields(): any {
    return this.http.get<any>('./assets/registerFormFields.json');
  }

  editUserFields(): any {
    return this.http.get<any>('./assets/editUserFields.json');
  }

  // API Calls

  login(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/login', data);
  }

  register(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/register', data);
  }

  activate(key: string): Observable<any> {
    return this.http.get(this.apiUrl + '/activate', {
      params: new HttpParams().set('key', key),
    });
  }

  // Password reset

  resetEmailField(): any {
    return this.http.get<any>('./assets/passwordReset.json');
  }

  resetByEmail(mail: string): Observable<any> {
    return this.http.post(this.apiUrl + '/reset-password-init', mail);
  }

  resetPasswordFields(): any {
    return this.http.get<any>('./assets/passwordResetFinish.json');
  }

  resetPassword(key: string, newPassword: string): Observable<any> {
    return this.http.post(this.apiUrl + '/reset-password-finish', { key, newPassword });
  }

}
