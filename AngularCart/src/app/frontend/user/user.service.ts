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
    return this.http.post(this.apiUrl + '/register', data, { observe: 'response' });
  }

  verifyEmail(id:any, token:any): Observable<any> {
    return this.http.get(this.apiUrl + `/verifyEmail/${id}/${token}`, { observe: 'response' });
  }

  // Password reset

  resetEmailField(): any {
    return this.http.get<any>('./assets/formFields/passwordReset.json');
  }

  resetByEmail(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/passwordResetInit', data, { observe: 'response' });
  }

  resetPasswordFields(): any {
    return this.http.get<any>('./assets/formFields/passwordResetFinish.json');
  }

  resetPassword(id:any, token:any, data: any): Observable<any> {
    return this.http.post(this.apiUrl + `/passwordResetFinish/${id}/${token}`, data, { observe: 'response' });
  }

}
