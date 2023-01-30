import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { envorinment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
// URL = envorinment.URL;
export class CrudService {
  URL = 'https://salaapi.azurewebsites.net/';
  LOCAL_URL = 'http://localhost:3000/';
  constructor( private http: HttpClient ) {}
    
  getCourses() {
    return this.http.get(this.LOCAL_URL + 'Courses')
  }

  deleteCourse(id: number) {
    return this.http.delete(this.LOCAL_URL + 'Courses/' + id)
  }

  getRoom() {
    return this.http.get(this.LOCAL_URL + 'Room')
  }

  // deleteRoom(id: number) {
  //   return this.http.delete(this.LOCAL_URL + 'Room')
  // }
}
