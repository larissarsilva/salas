import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  LOCAL_URL = 'https://salaapi.azurewebsites.net/Professors';
  // LOCAL_URL = 'http://localhost:3000/Professors';

  token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0c2VyaWFsbnVtYmVyIjoiMSIsInVuaXF1ZV9uYW1lIjoidXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNjc1ODk4Nzk3LCJleHAiOjE2NzU5Mjc1OTcsImlhdCI6MTY3NTg5ODc5N30.UDjKhmUtaGzTC44qAYj0dpG4cWa4HjHeTjyWFM-4C10';

  constructor(private http: HttpClient) {
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
