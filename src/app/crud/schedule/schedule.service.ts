import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envorinment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  LOCAL_URL = envorinment.apiURL + 'Classes';
  PDF_URL = envorinment.apiURL + 'Document/extract/classes';
  token: any

  constructor(private http: HttpClient) {
    this.token = 'bearer' + window.localStorage.getItem('token');
  }

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

  deleteAllClasses() {
    return this.http.delete(this.LOCAL_URL,
      { headers: new HttpHeaders().set('Authorization', this.token) })
  }

  editClass(data: any) {
    return this.http.put(this.LOCAL_URL, data,
      { headers: new HttpHeaders().set('Authorization', this.token) })
  }

  uploadPDF(data: any) {
    return this.http.post(this.PDF_URL, data,
      { headers: new HttpHeaders().set('Authorization', this.token) })
  }

  multipleClasses(data:any) {
    return this.http.post(this.LOCAL_URL + '/batch', data,
      { headers: new HttpHeaders().set('Authorization', this.token) })
  }
}
