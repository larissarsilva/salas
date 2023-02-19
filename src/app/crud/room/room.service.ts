import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  URL = 'https://salaapi.azurewebsites.net/Rooms';
  // LOCAL_URL = 'http://localhost:3000/';
  LOCAL_URL = this.URL;
  token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0c2VyaWFsbnVtYmVyIjoiMSIsInVuaXF1ZV9uYW1lIjoidXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNjc2NzY4MTA0LCJleHAiOjE2NzY3OTY5MDQsImlhdCI6MTY3Njc2ODEwNH0.lbpZIJNbdIyxWOt7uN4axjvZvEmMJPFlj6g8EONtvCU'

  constructor(private http: HttpClient) { }

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
