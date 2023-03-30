import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { User } from './login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required]
  });

  private user: User = new User();
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AccountService) {
      this.user.email = 'user@example.com';
      this.user.password = 'string';
  }

  ngOnInit(): void {
  }


  login() {
    this.authService.login(this.user);
  }
}
