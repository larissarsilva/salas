import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envorinment } from 'src/app/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  LOCAL_URL = envorinment.apiURL + 'Users';
  token: string;


  constructor(private http: HttpClient) {
    this.token = 'bearer' + window.localStorage.getItem('token');
  }

  getUsers() {
    return this.http.get(this.LOCAL_URL,
      { headers: new HttpHeaders().set('Authorization', this.token) }).toPromise();
  }

  deleteUser(id: number) {
    return this.http.delete(this.LOCAL_URL + '/' + id,
      { headers: new HttpHeaders().set('Authorization', this.token) }).toPromise();
  }

  postUser(data: any) {
    return this.http.post(this.LOCAL_URL, data,
      { headers: new HttpHeaders().set('Authorization', this.token) }).toPromise();
  }

  putUser(data: any) {
    return this.http.put(this.LOCAL_URL, data,
      { headers: new HttpHeaders().set('Authorization', this.token) }).toPromise();
  }

  getUsertDetails(id: number) {
    return this.http.get(this.LOCAL_URL + '/' + id,
      { headers: new HttpHeaders().set('Authorization', this.token) });
  }


}
