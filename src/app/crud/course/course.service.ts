import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envorinment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  LOCAL_URL = envorinment.apiURL + 'Courses';
  token: any;


  constructor( private http: HttpClient ) {
    this.token = 'bearer' + window.localStorage.getItem('token');
  }

  getCourses() {
    return this.http.get(this.LOCAL_URL,
    {headers: new HttpHeaders().set('Authorization', this.token)}).toPromise();
  }

  postCourse(data: any) {
    return this.http.post(this.LOCAL_URL, data,
    {headers: new HttpHeaders().set('Authorization', this.token)}).toPromise();
  }

  deleteCourse(id: number) {
    return this.http.delete(this.LOCAL_URL + '/' + id,
    {headers: new HttpHeaders().set('Authorization', this.token)}).toPromise();
  }

  putCourse(data: any) {
    console.log('data', data)
    return this.http.put(this.LOCAL_URL, data,
    {headers: new HttpHeaders().set('Authorization', this.token)}).toPromise();
  }

  getCourseById(id: number) {
    return this.http.get(this.LOCAL_URL + '/' + id,
    {headers: new HttpHeaders().set('Authorization', this.token)}).toPromise();
  }
}
