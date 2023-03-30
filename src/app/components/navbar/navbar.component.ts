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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService  ) {}

  redirectToLogin(){
    // remover a navbar
    window.localStorage.setItem('token', '');
    this.router.navigate(['/login']);
  }
}
