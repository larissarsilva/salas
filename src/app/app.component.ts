import { Component, OnInit } from '@angular/core';
import { AccountService } from './access/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SAL@S';

  showMenu: boolean = false;
  isAuthenticated: boolean = false;
  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.showNavbarEmitter.subscribe(
      value => this.showMenu = value
    );

    this.accountService.isLogged.subscribe(
      value => this.isAuthenticated = value
    );

    console.log = function():void{}; 

  }
}
