import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  URL = 'https://salaapi.azurewebsites.net/';
  // LOCAL_URL = 'http://localhost:3000/';
  LOCAL_URL = this.URL;
  token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0c2VyaWFsbnVtYmVyIjoiMSIsInVuaXF1ZV9uYW1lIjoidXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNjc1NzIzMTU4LCJleHAiOjE2NzU3NTE5NTgsImlhdCI6MTY3NTcyMzE1OH0.XSQd58FVqzv4EfNuZwrpKMF_ZlDTR174stMe5FB43t4';

  constructor( private http: HttpClient ) {}

  getCourses() {
    return this.http.get(this.URL + 'Courses',
    {headers: new HttpHeaders().set('Authorization', this.token)})
  }

  postCourse(data: any) {
    return this.http.post(this.LOCAL_URL + 'Courses', data,
    {headers: new HttpHeaders().set('Authorization', this.token)});
  }

  deleteCourse(id: number) {
    return this.http.delete(this.LOCAL_URL + 'Courses/' + id,
    {headers: new HttpHeaders().set('Authorization', this.token)});
  }

  putCourse(data: any) {
    console.log('data', data)
    return this.http.put(this.LOCAL_URL + 'Courses', data,
    {headers: new HttpHeaders().set('Authorization', this.token)})
  }

  getCourseById(id: number) {
    return this.http.get(this.LOCAL_URL + 'Courses/' + id,
    {headers: new HttpHeaders().set('Authorization', this.token)});
  }
}
