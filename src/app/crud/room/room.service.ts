import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envorinment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  LOCAL_URL = envorinment.apiURL + 'Rooms';
  token: any;

  constructor(private http: HttpClient) {
    this.token = 'bearer' + window.localStorage.getItem('token');
   }

  getRoom() {
    return this.http.get(this.LOCAL_URL,
      { headers: new HttpHeaders().set('Authorization', this.token) })
  }

  createRoom(data: any) {
    return this.http.post(this.LOCAL_URL, data,
      { headers: new HttpHeaders().set('Authorization', this.token) })
  }

  deleteRoom(roomId: number) {
    return this.http.delete(this.LOCAL_URL + '/' + roomId,
      { headers: new HttpHeaders().set('Authorization', this.token) })
  }

  editRoom(data: any) {
    return this.http.put(this.LOCAL_URL, data,
      { headers: new HttpHeaders().set('Authorization', this.token) })
  }

}
