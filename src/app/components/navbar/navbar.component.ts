import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router  ) {}

    
  logout(){
    this.router.navigate(['/login']);
  }
}
