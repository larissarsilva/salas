import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  URL = 'https://salaapi.azurewebsites.net/';
  LOCAL_URL = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
  }

  getProfessor() {
    return this.http.get(this.LOCAL_URL + 'Professors');
  }
}
