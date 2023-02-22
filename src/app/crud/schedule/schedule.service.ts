import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  URL = 'https://salaapi.azurewebsites.net/Classes';
  // LOCAL_URL = 'http://localhost:3000/';
  LOCAL_URL = this.URL;
  token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0c2VyaWFsbnVtYmVyIjoiMSIsInVuaXF1ZV9uYW1lIjoidXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNjc3MDE2MTc4LCJleHAiOjE2NzcwNDQ5NzgsImlhdCI6MTY3NzAxNjE3OH0.GAGSwVdemPnk97140pGb10Skq4gl8X1HRY2zzahbxik'

  constructor(private http: HttpClient) { }

  getClasses() {
    return this.http.get(this.LOCAL_URL,
      { headers: new HttpHeaders().set('Authorization', this.token) })
  }

  createClass(data: any) {
    return this.http.post(this.LOCAL_URL, data,
      { headers: new HttpHeaders().set('Authorization', this.token) })
  }

  deleteClass(classId: number) {
    return this.http.delete(this.LOCAL_URL + '/' + classId,
      { headers: new HttpHeaders().set('Authorization', this.token) })
  }

  editClass(data: any) {
    return this.http.put(this.LOCAL_URL, data,
      { headers: new HttpHeaders().set('Authorization', this.token) })
  }
}
