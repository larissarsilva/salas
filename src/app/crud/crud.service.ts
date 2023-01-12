import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { envorinment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
// URL = envorinment.URL;
export class CrudService {
  URL = 'https://salaapi.azurewebsites.net/';
  constructor( private http: HttpClient ) {}
    
  getCourses() {
   return this.http.get(this.URL + 'Courses')
  }
}
