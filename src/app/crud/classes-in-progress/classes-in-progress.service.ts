import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envorinment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassesInProgressService {

  LOCAL_URL = envorinment.apiURL 
  classesInProgress = this.LOCAL_URL + 'ClassesInProgress';
  token: any;


  constructor( private http: HttpClient ) {
    this.token = 'bearer' + window.localStorage.getItem('token');
  }

  getClassesInProgress() {
    return this.http.get(this.classesInProgress,
    {headers: new HttpHeaders().set('Authorization', this.token)});
  }

  createClassInProgress(data: any) {
    return this.http.post(this.classesInProgress, data,
      { headers: new HttpHeaders().set('Authorization', this.token) });
  }

  editClassInProgress(data: any) {
    return this.http.put(this.classesInProgress, data,
      { headers: new HttpHeaders().set('Authorization', this.token) });
  }

  deleteClassInProgress(classId: number) {
    return this.http.delete(this.classesInProgress + '/' + classId,
      { headers: new HttpHeaders().set('Authorization', this.token) });
  }

  finishClassInProgress(classId: number) {
    return this.http.delete(this.classesInProgress + '/' + classId + '/finish',
      { headers: new HttpHeaders().set('Authorization', this.token) });
  }

}
