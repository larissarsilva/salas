import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './login/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;

  // token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0c2VyaWFsbnVtYmVyIjoiMSIsInVuaXF1ZV9uYW1lIjoidXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNjc1NTU4MDI4LCJleHAiOjE2NzU1ODY4MjgsImlhdCI6MTY3NTU1ODAyOH0.h7nRMtsLwA8ixydkA_gBXAnvLWVlrWez4ju81N5wCk4';


  showNavbarEmitter = new EventEmitter<boolean>;

  constructor(
    private router: Router
  ) { }

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   if(this.isAuthenticated) {
  //     request = request.clone({
  //       setHeaders: { Authorization: `bearer ${this.token}` }
  //   });
  //   }
  //   return next.handle(request);
  // }


  login(user: User) {
    if(user.name == 'larissa') {
      this.isAuthenticated = true;
      this.showNavbarEmitter.emit(true);
      this.router.navigate(['/listagem']);
    } else {
      this.isAuthenticated = false;
      this.showNavbarEmitter.emit(false);
    }
  }

  authenticated() {
    return this.isAuthenticated;
  }

}
