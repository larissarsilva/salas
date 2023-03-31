import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envorinment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirstAccessService {

  LOCAL_URL = envorinment.apiURL + 'Authentications'
  token: any;


  constructor( private http: HttpClient ) {
    this.token = 'bearer' + window.localStorage.getItem('token');
  }

  firstAccess(data: any) {
    return this.http.post(this.LOCAL_URL + '/validate', data).toPromise();
      // { headers: new HttpHeaders().set('Authorization', this.token) }).toPromise();
  }

}
