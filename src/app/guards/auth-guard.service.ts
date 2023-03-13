import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../access/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  // canActivate(
  //   route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean { 

  //   if(this.accountService.authenticatedUser()) {
  //     return true;
  //   }
  
  //   // Se o usuário não estiver autenticado, vai redirecionar para tela de login
  //   this.router.navigate(['/login']);
  //   return false;
  // }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.accountService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }


}
