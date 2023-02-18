import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Room } from '../crud.interface';
import { RoomService } from './room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  listRooms: Room[] = [];
  showCreateRoom: boolean = false; // Exibir o componente de criar sala

  //Variáveis de comunicação de componente
  fieldType!: string; // Tipo do campo edit/create
  sendRoomValues!: string; // Enviar para o componente de editar sala

  // 'key'
  displayedColumns: string[] = ['name', 'block', 'isAcessible',
    'hasAirConditioner', 'hasFan', 'hasProjector', 'capacity',
    'available', 'note', 'action'];


  constructor(
    private roomService: RoomService
  ) { }



  ELEMENT_DATA = [];

  ngOnInit() {
    this.getRoom();
  }

  getRoom() {
    this.roomService.getRoom().subscribe((response: any) => {
      const statusCode = response['code'];
      switch (statusCode) {
        case 200:
          this.listRooms = response.content;
          break;
        case 204:
          console.log('NO CONTENT');
          break
        default: console.log('erro')
          break;
      }
    });
  }

  createRoom() {
    this.showCreateRoom = true;
    this.fieldType = 'create';
  }

  editRoom(data: any) {
    this.showCreateRoom = true;
    this.fieldType = 'edit';
    this.sendRoomValues = data;
  }

  deleteRoom(roomId: number, name: string) {
    Swal.fire({
      title: 'Tem certeza que gostaria de deletar ' + name + '?',
      text: "Essa ação não poderá ser desfeita",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.roomService.deleteRoom(roomId).subscribe((response: any) => {
          const statusCode = response['code'];
          switch (statusCode) {
            case 200:
              this.getRoom();
              break;

            default:
              break;
          }
        });
      }
    });
  }

  // Atualizar a lista após uma criação/edição
  refreshRoom(value: any) {
    if (value) {
      this.getRoom();
    }
  }

  // Oculta o campo de criação/edição
  getShowCreateFieldValue(value: any) {
    this.showCreateRoom = value;
  }


}
