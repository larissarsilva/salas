import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;

  showNavbarEmitter = new EventEmitter<boolean>;

  constructor(
    private router: Router
  ) { }

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
