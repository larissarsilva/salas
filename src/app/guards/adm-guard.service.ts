import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../access/account.service';

@Injectable({
  providedIn: 'root'
})

export class AdmGuardGuard implements CanActivateChild {
  constructor(
    private accountService: AccountService,
  ) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const role = this.accountService.isFirstAccess();
    if(role == 'Administrator') {
      return true;
    } else {
      return false;
    }
  }
  
}
