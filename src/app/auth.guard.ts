import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token') === null || localStorage.getItem('expired') === null) {
      localStorage.removeItem('token');
      localStorage.removeItem('expired');
      localStorage.removeItem('idTokenFace');
      localStorage.removeItem('roleId');
      this.router.navigate(['/']);
      return false;
    } else {
      const fecha: number = new Date().getTime();
      const expired = localStorage.getItem('expired');

      if (Number(expired) - 1000 * 60 * 5 < fecha) {
        localStorage.removeItem('token');
        localStorage.removeItem('expired');
        localStorage.removeItem('idTokenFace');
        this.router.navigate(['/']);
        return false;
      }
      if (localStorage.getItem('idTokenFace') == null) {
        localStorage.removeItem('token');
        localStorage.removeItem('expired');
        localStorage.removeItem('roleId');
        localStorage.removeItem('idTokenFace');
        this.router.navigate(['/']);
        return false;
      }
      const calcTkn = (parseInt(localStorage.getItem('idTokenFace'), 10) / 101011).toString();
      if (calcTkn === localStorage.getItem('expired')) {
        return true;
      } else {
        const calcTkn = (parseInt(localStorage.getItem('idTokenFace'), 10) / 1010112).toString();
        if (calcTkn === localStorage.getItem('expired')) {

          this.router.navigate(['/facematch']);
          return false;
        }
      }

      if (localStorage.getItem('roleId')) {
        return true;
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('expired');
        localStorage.removeItem('roleId');
        localStorage.removeItem('idTokenFace');
        this.router.navigate(['/']);
        return false;
      }

    }
  }

}
