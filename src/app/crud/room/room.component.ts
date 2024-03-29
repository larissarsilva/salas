import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { Room } from '../crud.interface';
import { RoomService } from './room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  p: number = 1;
  listRooms: Room[] = [];
  showCreateRoom: boolean = false; // Exibir o componente de criar sala
  filterRoom = '';
  disableButtons: boolean = false;

  //Variáveis de comunicação de componente
  fieldType!: string; // Tipo do campo edit/create
  sendRoomValues!: string; // Enviar para o componente de editar sala

  ELEMENT_DATA = [];
  // 'key'
  displayedColumns: string[] = ['name', 'block', 'isAcessible',
    'hasAirConditioner', 'hasFan', 'hasProjector', 'capacity',
    'available', 'note', 'action'];

  constructor(
    private roomService: RoomService,
    private ngxService: NgxUiLoaderService,
  ) { }


  ngOnInit() {
    this.getRoom();
  }

  getRoom() {
    this.ngxService.start('getRoom');
    this.roomService.getRoom().subscribe((response: any) => {
      this.ngxService.stop('getRoom');
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
    this.disableButtons = true;
    this.showCreateRoom = true;
    this.fieldType = 'create';
  }

  editRoom(data: any) {
    this.disableButtons = true;
    this.showCreateRoom = true;
    this.fieldType = 'edit';
    this.sendRoomValues = data;
  }

  deleteRoom(roomId: number, name: string) {
    Swal.fire({
      title: 'Tem certeza que gostaria de deletar a sala: ' + name + '?',
      text: "Essa ação não poderá ser desfeita",
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngxService.start('deleteRoom');
        this.roomService.deleteRoom(roomId).subscribe((response: any) => {
          const statusCode = response['code'];
          this.ngxService.stop('deleteRoom');
          switch (statusCode) {
            case 200:
              this.getRoom();
              Swal.fire(
                'Sucesso!',
                'Sala excluída',
                'success'
              );
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
  getShowCreateFieldValue(value: boolean) {
    this.showCreateRoom = value;
    this.disableButtons = value;
  }


}
