import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class InterceptInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // SI ES UNA PETICION PARA LOGIN
    if (req.headers.get('No-Auth') == 'True') {
      return next.handle(req.clone());
    }
    if (req.url.includes("validacion-correo")){
      return next.handle(req.clone());
    }
    const token = localStorage.getItem('token');
    const expired = localStorage.getItem('expired');

    if (token != null && expired != null) {

      const fecha: number = new Date().getTime();

      if (fecha > Number(expired)) {
        localStorage.removeItem('token');
        localStorage.removeItem('expired');
        this.router.navigate(['/login']);
        return;
      }

      const clonedreq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });

      return next.handle(clonedreq).pipe(tap(event => {
        // if (event instanceof HttpResponse) {

        //   console.log(" all looks good");
        //   // http response status code
        //   console.log(event.status);
        // }
      }, error => {
        console.log(error.status);
        localStorage.removeItem('token');
        localStorage.removeItem('expired');
        this.router.navigate(['/login']);
      }));

    }
    else {
      localStorage.removeItem('token');
      localStorage.removeItem('expired');
      this.router.navigate(['/login']);
    }
  }
}
