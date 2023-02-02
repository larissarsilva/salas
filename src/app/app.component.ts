import { Component, OnInit } from '@angular/core';
import { AuthService } from './access/login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SAL@';

  showMenu: boolean = false;
  // O AuthService tem escorpo global
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.showNavbarEmitter.subscribe(
      value => this.showMenu = value
    );
  }
}
