import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './login/login.interface';
import { envorinment } from '../environments/environment';
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private isAuthenticated: boolean = false;
  isLogged = new EventEmitter<boolean>;
  showNavbarEmitter = new EventEmitter<boolean>;
  LOCAL_URL = envorinment.apiURL + 'Authentications';
  token!: string;
  
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  async login(user: User) {
  this.http.post(this.LOCAL_URL , user).subscribe((response: any) => {
    const statusCode = response['code'];
        switch (statusCode) {
          case 200:
            this.isAuthenticated = true;
            this.token = response['content'];
            this.isLogged.emit(true);
            this.showNavbarEmitter.emit(true);
            this.router.navigate(['/listagem']);
            this.autenticar(this.token);
            break;
        
          default:
            this.isAuthenticated = false;
            this.showNavbarEmitter.emit(false);
            break;
        }
  });
  }

  autenticar(value: any) {
    window.localStorage.setItem('token', value);
  }

  getAuth(){
    return window.localStorage.getItem('token');
  }


  authenticatedUser() {
    return this.isAuthenticated;
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }

  getTokenExpirationDate(token: string): Date  {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null as any;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn(): boolean {
    const token = this.getAuthorizationToken();
    if (!token) {
      this.isLogged.emit(false);
      this.showNavbarEmitter.emit(false);
      return false;
    } else if (this.isTokenExpired(token)) {
      this.isLogged.emit(false);
      this.showNavbarEmitter.emit(false);
      return false;
    }
    this.isLogged.emit(true);
    this.showNavbarEmitter.emit(true);
    return true;
  }

}
