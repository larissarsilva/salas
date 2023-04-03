import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envorinment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetNewPasswordService {
  LOCAL_URL = envorinment.apiURL + 'Authentications';
  token: string;

  constructor(private http: HttpClient) {
    this.token = 'bearer' + window.localStorage.getItem('token');
  }

  setNewPassword(passwordValues: any) {
   const data =  {
    name: passwordValues.name,
    surname: passwordValues.surname,
    email: passwordValues.email,
    password: passwordValues.password
    }
    return this.http.post(this.LOCAL_URL + '/sign-up', data,
      { headers: new HttpHeaders().set('Authorization', this.token) }).toPromise();
  }

}
