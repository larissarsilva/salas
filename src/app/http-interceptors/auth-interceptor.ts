import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from '../access/account.service';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private accountService: AccountService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.accountService.getAuth();
    let request: HttpRequest<any> = req;
    if (token && !this.accountService.isTokenExpired(token)) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(request)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let statusCode;
    if (error.error instanceof ErrorEvent) {
      // Erro de client-side ou de rede
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      statusCode = error.status;
      // statusCode = error.error.code;
      // Erro retornando pelo backend
      console.error(
        `Código do erro ${error.status}, ` +
        // `Conteudo ${error.error.content}, ` +
        `Erro: ${JSON.stringify(error.statusText)}`);
        const erroMsg = JSON.stringify(error.error.message);
        if(erroMsg == '"Invalid email address or password."'){
          Swal.fire(
            'Email e/ou senha inválido(s)',
            'Tente novamente!',
            'warning'
          );
        }
    }
    // retornar um observable com uma mensagem amigavel.
    // return throwError({'code':statusCode});
    return throwError(() => error);
  }
}
