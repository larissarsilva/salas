import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envorinment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  LOCAL_URL = envorinment.apiURL + 'Professors';
  token: any;

  constructor(private http: HttpClient) {
    this.token = 'bearer' + window.localStorage.getItem('token');
  }

  getProfessors() {
    return this.http.get(this.LOCAL_URL,
      { headers: new HttpHeaders().set('Authorization', this.token) });
  }

  postProfessor(data: any) {
    return this.http.post(this.LOCAL_URL, data,
      { headers: new HttpHeaders().set('Authorization', this.token) })
  }

  deleteProfessor(professorId: number) {
    return this.http.delete(this.LOCAL_URL + '/' + professorId,
      { headers: new HttpHeaders().set('Authorization', this.token) })
  }

  putProfessor(data: any) {
    return this.http.put(this.LOCAL_URL, data,
      { headers: new HttpHeaders().set('Authorization', this.token) })
  }
}
