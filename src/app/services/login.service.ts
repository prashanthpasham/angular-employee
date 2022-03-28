import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../model/Login';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
 private corsHeaders: HttpHeaders;
  private baseURL = environment.apiUrl + 'api/login';
  //private errorMsg:string='';
   message:BehaviorSubject<string>;
  constructor(private httpClient: HttpClient) {
    this.message = new BehaviorSubject<string>('');
    this.corsHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    });
  }
  setErrorMessage(msg:string){
    this.message.next(msg);
  }
  getLoginDetails(emailId: string, password: string): Observable<Login> {
    return this.httpClient.post<Login>(
      `${this.baseURL}/getLoginDetails`,{emailId:emailId,password:password}
    );
  }

  logoutById(login: Login): Observable<Login> {
    return this.httpClient.post<Login>(
      `${this.baseURL}` + '/logoutById',
      login
    );
  }

  signup(login: Login): Observable<Login> {
    return this.httpClient.post<Login>(`${this.baseURL}` + '/signup', login);
  }
  getUsersList() {
    return this.httpClient.get<Login[]>(
      `${this.baseURL}` + '/users'
    );
  }
  validateEmail(emailId: string):Observable<any> {
    return this.httpClient.get(`${this.baseURL}/validateEmail/${emailId}`);
  }
  resetPassword(obj:any):Observable<any> {
   return this.httpClient.put(`${this.baseURL}` + '/reset-password', JSON.stringify(obj),{responseType:"text"});
  }
  changeRole(json: string):Observable<any> {
   return this.httpClient.put(`${this.baseURL}` + '/role-update',json,{responseType:'text'});
  }
  submitQuery(json: any) {
   return this.httpClient.post(`${this.baseURL}`+'/submit-query',json,{responseType:'text'});
  }
  
}
