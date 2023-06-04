import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class LoginComponent {

  private user: User = new User();
  hide: boolean = true;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AccountService,
    public dialog: MatDialog
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  redirectToHome() {
    this.router.navigate(['']);
  }

  login() {
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
    }
  }

  firstAccess() {
    const dialogRef = this.dialog.open(FirstAccessComponent, {
    });
  }
}
