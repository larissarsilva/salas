import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/access/account.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() isLogged: boolean = false;
  isAuthenticated: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService  ) {}

  redirectToLogin(){
    this.isAuthenticated =  this.accountService.isUserLoggedIn;
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
