import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envorinment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  LOCAL_URL = envorinment.apiURL + 'Subjects';
  token: string;

  constructor(private http: HttpClient) {
    this.token = 'bearer' + window.localStorage.getItem('token');
  }

  getSubjects() {
    return this.http.get(this.LOCAL_URL,
      { headers: new HttpHeaders().set('Authorization', this.token) });
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
