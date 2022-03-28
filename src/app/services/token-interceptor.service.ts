import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private _authservice: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if(req.url.search("/api/login")==-1){
    let tokenRquest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this._authservice.getToken()}`,
      },
    });
    return next.handle(tokenRquest).pipe(
      catchError((err) => {
        if (err.status == 401 || err.status == 500) {
          this._authservice.logout();
         alert("Session Expired!");
          location.reload();
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
    }else{
      return next.handle(req);
    }
  }
}
