import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from '../access/account.service';

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
        headers: req.headers.set('Authorization', `bearer ${token}`)
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
      statusCode = error.error.code;
      // Erro retornando pelo backend
      console.error(
        `Código do erro ${error.error.code}, ` +
        // `Conteudo ${error.error.content}, ` +
        `Erro: ${JSON.stringify(error.error.message)}`);
    }
    // retornar um observable com uma mensagem amigavel.
    return throwError({'code':statusCode});
  }
}
