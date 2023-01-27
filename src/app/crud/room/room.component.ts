import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent  implements OnInit {

  displayedColumns: string[] = ['name', 'block', 'isAcessible', 
  'hasAirConditioner', 'hasFan', 'hasProjector', 'capacity',
  'key', 'available', 'note', 'action'];

  ELEMENT_DATA = [];
  
  response = [{
        "id": 0,
        "name": "K 09",
        "block": 0,
        "isAcessible": true,
        "hasAirConditioner": true,
        "hasFan": true,
        "hasProjector": true,
        "capacity": 30,
        "keyId": 0,
        "key": {
          "id": 0,
          "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        },
        "available": true,
        "note": "Esta sala não possue cadeira para canhoto"
    },
    {
      "id": 1,
      "name": "LIP 07",
      "block": 0,
      "isAcessible": false,
      "hasAirConditioner": true,
      "hasFan": true,
      "hasProjector": false,
      "capacity": 45,
      "keyId": 0,
      "key": {
        "id": 0,
        "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      },
      "available": true,
      "note": "Esta sala não possue nenhuma restrição"
  },
  {
    "id": 0,
    "name": "LIP 07",
    "block": 0,
    "isAcessible": false,
    "hasAirConditioner": true,
    "hasFan": true,
    "hasProjector": false,
    "capacity": 45,
    "keyId": 0,
    "key": {
      "id": 0,
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    "available": true,
    "note": "Esta sala não possue nenhuma restrição"
},
{
  "id": 0,
  "name": "LIP 07",
  "block": 0,
  "isAcessible": false,
  "hasAirConditioner": true,
  "hasFan": true,
  "hasProjector": false,
  "capacity": 45,
  "keyId": 0,
  "key": {
    "id": 0,
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "available": true,
  "note": "Esta sala não possue nenhuma restrição"
},
{
  "id": 0,
  "name": "LIP 07",
  "block": 0,
  "isAcessible": false,
  "hasAirConditioner": true,
  "hasFan": true,
  "hasProjector": false,
  "capacity": 45,
  "keyId": 0,
  "key": {
    "id": 0,
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "available": true,
  "note": "Esta sala não possue nenhuma restrição"
},
{
  "id": 0,
  "name": "LIP 07",
  "block": 0,
  "isAcessible": false,
  "hasAirConditioner": true,
  "hasFan": true,
  "hasProjector": false,
  "capacity": 45,
  "keyId": 0,
  "key": {
    "id": 0,
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "available": true,
  "note": "Esta sala não possue nenhuma restrição"
},{
  "id": 0,
  "name": "LIP 07",
  "block": 0,
  "isAcessible": false,
  "hasAirConditioner": true,
  "hasFan": true,
  "hasProjector": false,
  "capacity": 45,
  "keyId": 0,
  "key": {
    "id": 0,
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "available": true,
  "note": "Esta sala não possue nenhuma restrição"
},{
  "id": 0,
  "name": "LIP 07",
  "block": 0,
  "isAcessible": false,
  "hasAirConditioner": true,
  "hasFan": true,
  "hasProjector": false,
  "capacity": 45,
  "keyId": 0,
  "key": {
    "id": 0,
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "available": true,
  "note": "Esta sala não possue nenhuma restrição"
},{
  "id": 0,
  "name": "LIP 07",
  "block": 0,
  "isAcessible": false,
  "hasAirConditioner": true,
  "hasFan": true,
  "hasProjector": false,
  "capacity": 45,
  "keyId": 0,
  "key": {
    "id": 0,
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "available": true,
  "note": "Esta sala não possue nenhuma restrição"
},{
  "id": 0,
  "name": "LIP 07",
  "block": 0,
  "isAcessible": false,
  "hasAirConditioner": true,
  "hasFan": true,
  "hasProjector": false,
  "capacity": 45,
  "keyId": 0,
  "key": {
    "id": 0,
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "available": true,
  "note": "Esta sala não possue nenhuma restrição"
}

];
    dataSource = this.response;
 
    ngOnInit() { 
  }


}
