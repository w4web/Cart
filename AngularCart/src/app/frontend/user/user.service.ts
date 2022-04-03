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
    return this.http.get<any>('./assets/formFields/login.json');
  }

  getRegisterFields(): any {
    return this.http.get<any>('./assets/formFields/register.json');
  }

  editUserFields(): any {
    return this.http.get<any>('./assets/formFields/editUser.json');
  }

  // API Calls

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
    return this.http.get<any>('./assets/formFields/passwordReset.json');
  }

  resetByEmail(mail: string): Observable<any> {
    return this.http.post(this.apiUrl + '/reset-password-init', mail);
  }

  resetPasswordFields(): any {
    return this.http.get<any>('./assets/formFields/passwordResetFinish.json');
  }

  resetPassword(key: string, newPassword: string): Observable<any> {
    return this.http.post(this.apiUrl + '/reset-password-finish', { key, newPassword });
  }

}
