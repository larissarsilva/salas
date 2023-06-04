import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { envorinment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  LOCAL_URL = envorinment.apiURL + 'subjects';
  token: any;

  constructor(private http: HttpClient) {
    this.token = window.localStorage.getItem('token');
  }

  getSubjects() {
    return this.http.get(this.LOCAL_URL,
      { headers: new HttpHeaders().set('Authorization', this.token), observe: 'response' }).pipe(
        map((response: HttpResponse<any>) => {
          return response.body
        }),
        catchError(error => {
          console.log('tratamento de erro');
          return throwError(() => error);
        })
      )
  }

  deleteSubject(id: number) {
    return this.http.delete(this.LOCAL_URL + '/' + id,
      { headers: new HttpHeaders().set('Authorization', this.token) });
  }

  postSubject(data: any) {
    return this.http.post(this.LOCAL_URL, data,
      { headers: new HttpHeaders().set('Authorization', this.token) });
  }

  putSubject(data: any) {
    return this.http.put(this.LOCAL_URL, data,
      { headers: new HttpHeaders().set('Authorization', this.token) });
  }

  getSubjectDetails(id: number) {
    return this.http.get(this.LOCAL_URL + '/' + id,
      { headers: new HttpHeaders().set('Authorization', this.token) });
  }

}
