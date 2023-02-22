import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RoomService } from '../room/room.service';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})


export class ScheduleComponent implements OnInit {
  filterClass = '';
  p: number = 1;
  showCreateClass: boolean = false;
  fieldType!: string;
  sendClassValues!: any;

  displayedColumns: string[] = ['professors', 'subject', 'room', 'day', 'startTime', 'endTime', 'action'];
  ELEMENT_DATA = [];
  listClasses: any;

  constructor(
    private roomService: RoomService,
    private classesService: ScheduleService
  ) { }


  ngOnInit() {
    this.getClass();
  }

  getClass() {
    this.classesService.getClasses().subscribe((response: any) => {
      const statusCode = response['code'];
      switch (statusCode) {
        case 200:
          this.listClasses = response['content'];
          break;

        default:
          break;
      }
      console.log('switch', response)
    });
  }

  createClass() {
    this.showCreateClass = true;
    this.fieldType = 'create';
  }

  editClass(data: any) {
    this.showCreateClass = true;
    this.fieldType = 'edit';
    this.sendClassValues = data;
  }

  deleteClass(classId: number) {
    Swal.fire({
      title: 'Tem certeza que gostaria de deletar ?',
      text: "Essa ação não poderá ser desfeita",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.classesService.deleteClass(classId).subscribe((response: any) => {
          const statusCode = response['code'];
          switch (statusCode) {
            case 200:
              this.getClass();
              break;

            default:
              break;
          }
        });
      }
    });
  }
  
  deleteAllClasses() {
    Swal.fire({
      title: 'Tem certeza que gostaria de deletar todos os registros ?',
      text: "Essa ação não poderá ser desfeita",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.classesService.deleteAllClasses().subscribe((response: any) => {
          const statusCode = response['code'];
          switch (statusCode) {
            case 200:
              this.getClass();
              break;

            default:
              break;
          }
        });
      }
    });
  }

  refreshClass(value: any) {
    if (value) {
      this.getClass();
    }
  }

  getShowCreateFieldValue(value: any) {
    this.showCreateClass = value;
  }


}
