import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  URL = 'https://salaapi.azurewebsites.net/';
  // LOCAL_URL = 'http://localhost:3000/';
  LOCAL_URL = this.URL;
  token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0c2VyaWFsbnVtYmVyIjoiMSIsInVuaXF1ZV9uYW1lIjoidXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNjc1NTU4MDI4LCJleHAiOjE2NzU1ODY4MjgsImlhdCI6MTY3NTU1ODAyOH0.h7nRMtsLwA8ixydkA_gBXAnvLWVlrWez4ju81N5wCk4';


  constructor(private http: HttpClient) {
  }

getSubjects() {
  return this.http.get(this.LOCAL_URL + 'Subjects',
  {headers: new HttpHeaders().set('Authorization', this.token)});
}

deleteSubject(id: number) {
  return this.http.delete(this.LOCAL_URL + 'Subjects/' + id,
  {headers: new HttpHeaders().set('Authorization', this.token)});
}

postSubject(data: any) {
  return this.http.post(this.LOCAL_URL + 'Subjects', data,
  {headers: new HttpHeaders().set('Authorization', this.token)})
}

putSubject(data: any) {
  let dataObject = data;
  dataObject['id'] = 2;
  return this.http.put(this.LOCAL_URL + 'Subjects', data,
  {headers: new HttpHeaders().set('Authorization', this.token)})
}


}
