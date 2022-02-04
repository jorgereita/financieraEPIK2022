import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token') === null || localStorage.getItem('expired') === null) {
      localStorage.removeItem('token');
      localStorage.removeItem('expired');
      return true;
    } else {
      console.log(this.router.url);
      const fecha: number = new Date().getTime();
      const expired = localStorage.getItem('expired');

      if (Number(expired) - 1000 * 60 * 5 < fecha) {
        localStorage.removeItem('token');
        localStorage.removeItem('expired');
        return true;
      }

      this.router.navigate(['/funnel/initial-query']);
      return false;
    }
  }

}
