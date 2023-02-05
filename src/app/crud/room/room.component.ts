import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { RoomService } from './room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent  implements OnInit {
  dataSource: any;
  constructor(
    private roomService: RoomService
  ) { }

  displayedColumns: string[] = ['name', 'block', 'isAcessible', 
  'hasAirConditioner', 'hasFan', 'hasProjector', 'capacity',
  'key', 'available', 'note', 'action'];

  ELEMENT_DATA = [];
  
  ngOnInit() { 
      this.roomService.getRoom().subscribe((response: any) => {
        const statusCode = response['code'];
        if (statusCode == 200) {
          this.dataSource = response;
        } else if(statusCode == 204) {
          console.log('no content');
        } 
        else {
          //implementar
        }
      })
  }


}
