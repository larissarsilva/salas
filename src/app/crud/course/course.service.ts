import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  URL = 'https://salaapi.azurewebsites.net/';
  LOCAL_URL = 'http://localhost:3000/';

  constructor( private http: HttpClient ) {}

  postCourse(name: string, shift: number, subjects: any) {
    const data = {
      name: name,
      shift: shift,
      subjects: subjects
    }
    console.log('data', data);
    return this.http.post(this.LOCAL_URL + 'Courses', data);
  }

  deleteCourse(id: number) {
    return this.http.delete(this.LOCAL_URL + 'Courses/' + id);
  }
}
