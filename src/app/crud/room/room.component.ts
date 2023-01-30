import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent  implements OnInit {
  dataSource: any;
  constructor(
    private rooms: CrudService
  ) { }

  displayedColumns: string[] = ['name', 'block', 'isAcessible', 
  'hasAirConditioner', 'hasFan', 'hasProjector', 'capacity',
  'key', 'available', 'note', 'action'];

  ELEMENT_DATA = [];
  
  ngOnInit() { 
      this.rooms.getRoom().subscribe(responseObject => {
        this.dataSource = responseObject;
      })
  }


}
