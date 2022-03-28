import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../model/Login';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _loginservice: LoginService) {}
  isLoggedIn(): boolean {
    return (
      !!localStorage.getItem('Token') && !!localStorage.getItem('SessionUserId')
    );
  }
  getToken() {
    return localStorage.getItem('Token');
  }
  logout() {
    let login = new Login();
    let element = localStorage.getItem('SessionUserId');
    if (element != null) {
      login.id = parseInt(element.toString());
      this._loginservice.logoutById(login).subscribe(
        (data) => {
          this.removeSession();
        },
        (error) => {
          if(error instanceof HttpErrorResponse){
            if(error.status==401){
              this.removeSession();
            }
          }
          console.log(error);
        }
      );
    }
  }

  removeSession(){
    localStorage.removeItem('Token');
    localStorage.removeItem('SessionUserId');
    localStorage.removeItem('SessionUserRole');
    localStorage.removeItem('SessionUserName');
  }
}
