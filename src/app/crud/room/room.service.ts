import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { envorinment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  LOCAL_URL = envorinment.apiURL + 'rooms/list';
  token: any;

  constructor(private http: HttpClient) {
    this.token = 'bearer' + window.localStorage.getItem('token');
   }

   getRoom1() {
    let code: number;
    return this.http.get(this.LOCAL_URL,
      { headers: new HttpHeaders().set('Authorization', this.token), observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          code = response.status
        }),
        map((response: HttpResponse<any>) => {
          if(code == 200) {
            return response.body
          } else {
            return response.status
          }
        }));
  }


  //  getRoom1() {
  //   return this.http.get(this.LOCAL_URL,
  //     { headers: new HttpHeaders().set('Authorization', this.token) }).subscribe((response) => {
  //       console.log('resposta >', response)
  //     });
  // }

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
