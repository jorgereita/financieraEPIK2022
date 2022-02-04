import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl =  environment.externalBaseUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  authenticate(data): any {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<{ token: string, expired: number, error: number, roleId: number, Identificado: number, rol: string }>(this.baseUrl + '/api/auth/token'
      , data
      , { headers: new HttpHeaders({ 'No-Auth': 'True' }) }
    );
  }
 
  extend(): any {
    return this.httpClient.get<{ token: string, expired: number, error: number }>(this.baseUrl + '/api/auth/extend');
  }

  change(ContrasenaActual: string, ContrasenaNueva: string): any {
    return this.httpClient.post<{ error: number }>(this.baseUrl + '/api/auth/change'
      , { ContrasenaActual, ContrasenaNueva }
    );
  }
}
