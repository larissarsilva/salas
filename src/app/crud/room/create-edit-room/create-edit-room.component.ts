import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RoomService } from '../room.service';

@Component({
  selector: 'create-edit-room',
  templateUrl: './create-edit-room.component.html',
  styleUrls: ['./create-edit-room.component.css']
})
export class CreateEditRoomComponent implements OnInit {
  @Input() fieldType!: string;
  @Input() roomValues: any;
  @Output() showCreateField = new EventEmitter();
  @Output() hasNewRoom = new EventEmitter();

  listBlocks = [
    { id: 0, alias: 'A' },
    { id: 1, alias: 'B' },
    { id: 2, alias: 'C' },
    { id: 3, alias: 'D' },
    { id: 4, alias: 'E' },
    { id: 5, alias: 'F' },
    { id: 6, alias: 'G' },
    { id: 7, alias: 'H' },
    { id: 8, alias: 'I' },
    { id: 9, alias: 'J' },
    { id: 10, alias: 'K' },
  ];

  roomId!: number;
  showCreateButton: boolean = true;
  roomForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService
  ) {
    const uuid = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    this.roomForm = this.formBuilder.group({
      name: [null, Validators.required],
      block: [null, Validators.required],
      isAcessible: [null, Validators.required],
      hasAirConditioner: [null, Validators.required],
      hasFan: [null, Validators.required],
      hasProjector: [null, Validators.required],
      capacity: [null, Validators.required],
      key: [{ 'uuid': uuid }],
      available: [null, Validators.required],
      note: [null],
    });
  }

  ngOnInit() {
    switch (this.fieldType) {
      case 'edit':
        this.showCreateButton = false;
        this.fillFields();
        this.roomId = this.roomValues.id;
        break;

      default:
        this.showCreateButton = true;
        break;
    }
  }

  createRoom() {
    if (this.roomForm.valid) {
      this.roomService.createRoom(this.roomForm.value).subscribe((response: any) => {
        const statusCode = response['code'];
        switch (statusCode) {
          case 201:
            this.roomForm.reset();
            this.refreshRoom();
            break;

          default:
            break;
        }
      });
    }
  }

  updateRoom() {
    this.roomForm.value['id'] = this.roomId;
    if (this.roomForm.valid) {
      const roomName = this.roomForm.value.name;
      Swal.fire({
        title: 'Tem certeza que gostaria de editar ' +  roomName + '?',
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
          this.roomForm.value['id'] = this.roomId;
          this.roomService.editRoom(this.roomForm.value).subscribe((response: any) => {
            const statusCode = response['code'];
            switch (statusCode) {
              case 200:
                this.refreshRoom();
                this.cancelCreate();
                Swal.fire(
                  'Sucesso!',
                  'Sala atualizada!',
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
  }

  cancelCreate() {
    this.showCreateField.emit(false);
  }

  refreshRoom() {
    this.hasNewRoom.emit(true);
  }

  //Preenche os campos com os valores que foram passados ao clicar em editar
  fillFields() {
    this.roomForm.patchValue(this.roomValues);
  }

}
