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

  token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0c2VyaWFsbnVtYmVyIjoiMSIsInVuaXF1ZV9uYW1lIjoidXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNjc1NzIzMTU4LCJleHAiOjE2NzU3NTE5NTgsImlhdCI6MTY3NTcyMzE1OH0.XSQd58FVqzv4EfNuZwrpKMF_ZlDTR174stMe5FB43t4';


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
