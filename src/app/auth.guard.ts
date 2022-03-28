import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private _authservice:AuthService){}
  canActivate(): any {
    let login = this._authservice.isLoggedIn();
    console.log("login>>"+login);
    if(login){
      return true;
    }else
       this.router.navigate(['login']);
    return false;
  }
  
}
