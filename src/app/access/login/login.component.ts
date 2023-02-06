import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from './login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    name: ['', Validators.required],
    password: ['', Validators.required]
  });

  private user: User = new User();


  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {
      this.user.name = 'larissa';
      this.user.password = 'silva';
      this.user.type = 1;
  }

  ngOnInit(): void {

  }

  login() {
    console.log('usuario', this.user)
    this.authService.login(this.user);
  }
}
