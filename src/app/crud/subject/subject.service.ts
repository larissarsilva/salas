import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  URL = 'https://salaapi.azurewebsites.net/';
  // LOCAL_URL = 'http://localhost:3000/';
  LOCAL_URL = this.URL;

  token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0c2VyaWFsbnVtYmVyIjoiMSIsInVuaXF1ZV9uYW1lIjoidXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNjc2NzM0MjY1LCJleHAiOjE2NzY3NjMwNjUsImlhdCI6MTY3NjczNDI2NX0.M5wURsW516okygFW-iH0PiID47qGlzXZMhZflXB0L5E';

  constructor(private http: HttpClient) {
  }

  getSubjects() {
    return this.http.get(this.LOCAL_URL + 'Subjects',
      { headers: new HttpHeaders().set('Authorization', this.token) });
  }

  deleteSubject(id: number) {
    return this.http.delete(this.LOCAL_URL + 'Subjects/' + id,
      { headers: new HttpHeaders().set('Authorization', this.token) });
  }

  postSubject(data: any) {
    return this.http.post(this.LOCAL_URL + 'Subjects', data,
      { headers: new HttpHeaders().set('Authorization', this.token) })
  }

  putSubject(data: any) {
    return this.http.put(this.LOCAL_URL + 'Subjects', data,
      { headers: new HttpHeaders().set('Authorization', this.token) })
  }


}
