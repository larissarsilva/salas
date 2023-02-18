import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  LOCAL_URL = 'https://salaapi.azurewebsites.net/Professors';
  // LOCAL_URL = 'http://localhost:3000/Professors';

  token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0c2VyaWFsbnVtYmVyIjoiMSIsInVuaXF1ZV9uYW1lIjoidXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNjc2NzM0MjY1LCJleHAiOjE2NzY3NjMwNjUsImlhdCI6MTY3NjczNDI2NX0.M5wURsW516okygFW-iH0PiID47qGlzXZMhZflXB0L5E';

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
