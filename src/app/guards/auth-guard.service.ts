import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../access/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean> | boolean { 

    if(this.authService.authenticatedUser()) {
      return true;
    }
  
    // Se o usuário não estiver autenticado, vai redirecionar para tela de login
    this.router.navigate(['/login']);
    return false;
  }

  // canActivate(
  //   route: ActivatedRouteSnapshot, 
  //   state: RouterStateSnapshot): Observable<boolean> | boolean { 

  //   if(this.authService.authenticated()) {
  //     return true;
  //   }
  
  //   this.router.navigate(['/login']);
  //   return false;
  // }
}
