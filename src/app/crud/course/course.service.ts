import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { envorinment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  LOCAL_URL = envorinment.apiURL + 'courses/';
  token: any;


  constructor(private http: HttpClient) {
    this.token = window.localStorage.getItem('token');
  }

// Tudo  ainda pode ser passado pro interceptor?
  getCourses1() {
    let statusCode: number;
    return this.http.get(this.LOCAL_URL,
      { headers: new HttpHeaders().set('Authorization', this.token), observe: 'response' }).pipe(
        tap((response: HttpResponse<any>) => {
          // tap é usado apenas para executar uma tarefa e não afeta o fluxo do observable
          // só é chamada se for sucesso 2xx
          statusCode = response.status;
          console.log('statuscode no tap', statusCode)
        }),
        map((response: HttpResponse<any>) => {
          return response.body;
        }),
        catchError(error => {
          // entra todos os erros 3xx, 4xx, 5xx
          console.log('tratamento de erro em todos os lugares que a api é chamada', error);
          return throwError(() => error);
        })
        );
  }

  getCourses() {
    return this.http.get(this.LOCAL_URL,
    {headers: new HttpHeaders().set('Authorization', this.token)}).toPromise();
  }

  postCourse(data: any) {
    return this.http.post(this.LOCAL_URL, data,
      { headers: new HttpHeaders().set('Authorization', this.token) }).toPromise();
  }

  deleteCourse(id: number) {
    return this.http.delete(this.LOCAL_URL + '/' + id,
      { headers: new HttpHeaders().set('Authorization', this.token) }).toPromise();
  }

  putCourse(data: any) {
    console.log('data', data)
    return this.http.put(this.LOCAL_URL, data,
      { headers: new HttpHeaders().set('Authorization', this.token) }).toPromise();
  }

  getCourseById(id: number) {
    return this.http.get(this.LOCAL_URL + id,
      { headers: new HttpHeaders().set('Authorization', this.token) }).toPromise();
  }
}
