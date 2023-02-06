import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/access/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService  ) {}

    
  logout(){

    this.router.navigate(['/login']);
  }
}
