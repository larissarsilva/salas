import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { envorinment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
// URL = envorinment.URL;
export class CrudService {
  URL = 'https://salaapi.azurewebsites.net/';
  // LOCAL_URL = 'http://localhost:3000/';
  LOCAL_URL = this.URL;

  token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0c2VyaWFsbnVtYmVyIjoiMSIsInVuaXF1ZV9uYW1lIjoidXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNjc1ODk4Nzk3LCJleHAiOjE2NzU5Mjc1OTcsImlhdCI6MTY3NTg5ODc5N30.UDjKhmUtaGzTC44qAYj0dpG4cWa4HjHeTjyWFM-4C10';

  constructor( private http: HttpClient ) {}
    
  getCourses() {
    return this.http.get(this.URL + 'Courses', 
    {headers: new HttpHeaders().set('Authorization', this.token)})
  }

  deleteCourse(id: number) {
    return this.http.delete(this.LOCAL_URL + 'Courses/' + id,
    {headers: new HttpHeaders().set('Authorization', this.token)})
  }


  // deleteRoom(id: number) {
  //   return this.http.delete(this.LOCAL_URL + 'Room')
  // }
}
