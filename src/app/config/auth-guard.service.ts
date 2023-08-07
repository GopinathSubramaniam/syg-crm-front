import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private appService: AppService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): true | UrlTree {
    console.log("Url: " + url)
    let token: any = localStorage.getItem('token');

    if (token) {
      if (url == '/' || url == '/login' || url == '/register')
        return this.router.parseUrl('/auth/dashboard');
      else
        return true;
    } else {
      if (url == '/' || url == '/login' || url == '/register') {
        return true;
      } else {
        this.appService.errorToast('Error', 'Session loggedout. Please login again');
        return this.router.parseUrl('/login');
      }
    }

  }


}