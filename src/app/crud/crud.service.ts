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

  auth = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0c2VyaWFsbnVtYmVyIjoiMSIsInVuaXF1ZV9uYW1lIjoidXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNjc1NTU4MDI4LCJleHAiOjE2NzU1ODY4MjgsImlhdCI6MTY3NTU1ODAyOH0.h7nRMtsLwA8ixydkA_gBXAnvLWVlrWez4ju81N5wCk4';


  constructor( private http: HttpClient ) {}
    
  getCourses() {
    return this.http.get(this.URL + 'Courses', 
    {headers: new HttpHeaders().set('Authorization', this.auth)})
  }

  deleteCourse(id: number) {
    return this.http.delete(this.LOCAL_URL + 'Courses/' + id,
    {headers: new HttpHeaders().set('Authorization', this.auth)})
  }


  // deleteRoom(id: number) {
  //   return this.http.delete(this.LOCAL_URL + 'Room')
  // }
}
