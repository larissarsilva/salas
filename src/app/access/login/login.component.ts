import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { FirstAccessComponent } from '../first-access/first-access.component';
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
    private router: Router,
    private authService: AccountService,
    public dialog: MatDialog
    ) {
    this.user.email = 'user@example.com';
    this.user.password = 'string';
  }

  ngOnInit(): void {
  }

  redirectToHome() {
    this.router.navigate(['']);
  }

  login() {
    this.authService.login(this.user);
  }

  firstAccess() {
    const dialogRef = this.dialog.open(FirstAccessComponent, {
    });
  }
}
