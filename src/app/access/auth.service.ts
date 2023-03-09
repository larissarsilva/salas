import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './login/login.interface';
import { envorinment } from './../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  isLogged = new EventEmitter<boolean>;
  showNavbarEmitter = new EventEmitter<boolean>;
  LOCAL_URL = envorinment.apiURL + 'Authentications';
  token!: string;


  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.teste();
  }

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   if(this.isAuthenticated) {
  //     request = request.clone({
  //       setHeaders: { Authorization: `bearer ${this.token}` }
  //   });
  //   }
  //   return next.handle(request);
  // }


  login(user: User) {
  // this.http.post(this.LOCAL_URL , user).subscribe((response: any) => {
    // console.log('resposta', response);
    // const statusCode = response['code'];
    const statusCode = 200;
        switch (statusCode) {
          case 200:
            this.isAuthenticated = true;
            // this.token = response['content'];
            this.isLogged.emit(true);
            this.showNavbarEmitter.emit(true);
            this.router.navigate(['/listagem']);
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0c2VyaWFsbnVtYmVyIjoiMSIsInVuaXF1ZV9uYW1lIjoidXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNjc4MzIyODA4LCJleHAiOjE2NzgzNTE2MDgsImlhdCI6MTY3ODMyMjgwOH0.PA56zS-4jfjHBqkfHqm1IF1SbxpdqMYD5dBi7IGD5ts";
            this.autenticar(token);
            break;
        
          default:
            this.isAuthenticated = false;
            this.showNavbarEmitter.emit(false);
            break;
        }
  // });
  }

  autenticar(value: any) {
    window.localStorage.setItem('token', value);
  }

  getAuth(){
    return window.localStorage.getItem('token');
  }


  teste() {
    const token = window.localStorage.getItem('token');
    console.log('token local', token)
  }


  // login(user: User) {
  //   if(user.name == 'larissa') {
  //     this.isAuthenticated = true;
  //     this.showNavbarEmitter.emit(true);
  //     this.router.navigate(['/listagem']);
  //   } else {
  //     this.isAuthenticated = false;
  //     this.showNavbarEmitter.emit(false);
  //   }
  // }

  authenticatedUser() {
    return this.isAuthenticated;
  }

}
