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

  login(data: any): Observable<{}> {
    return this.http.post(this.apiUrl + 'login', data);
  }

  register(data: any): Observable<{}> {
    return this.http.post(this.apiUrl + '/api/auth/register', data);
  }

  activate(key: string): Observable<{}> {
    return this.http.get(this.apiUrl + 'activate', {
      params: new HttpParams().set('key', key),
    });
  }

  // Password reset

  resetEmailField(): any {
    return this.http.get<any>('./assets/passwordReset.json');
  }

  resetByEmail(mail: string): Observable<{}> {
    return this.http.post(this.apiUrl + 'account/reset-password/init', mail);
  }

  resetPasswordFields(): any {
    return this.http.get<any>('./assets/passwordResetFinish.json');
  }

  resetPassword(key: string, newPassword: string): Observable<{}> {
    return this.http.post(this.apiUrl + 'account/reset-password/finish', { key, newPassword });
  }

}
