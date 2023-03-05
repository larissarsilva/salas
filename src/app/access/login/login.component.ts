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
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  private user: User = new User();


  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {
      this.user.email = 'user@example.com';
      this.user.password = 'string';
  }

  ngOnInit(): void {
  }


  login() {
    this.authService.login(this.user);
  }

  // Verifica se a autenticação foi feita
  // login() {
  //   this.authService.login(this.user).subscribe((response: any) => {
  //     const statusCode = response['code'];
  //     console.log('logado?', response)
  //     switch (statusCode) {
  //       case 200:
  //         this.authService.isLogged = true;
  //         break;
      
  //       default:
  //         break;
  //     }
  //   });
  // }
}
