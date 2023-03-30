import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { classInProgress, Room } from '../crud.interface';
import { ClassesInProgressService } from './classes-in-progress.service';
import { CreateEditInProgressComponent } from './create-edit-in-progress/create-edit-in-progress.component';
import Swal from 'sweetalert2';
import { AccountService } from 'src/app/access/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../room/room.service';

@Component({
  selector: 'app-classes-in-progress',
  templateUrl: './classes-in-progress.component.html',
  styleUrls: ['./classes-in-progress.component.css']
})
export class ClassesInProgressComponent implements OnInit {

  // Exibição na tabela
  displayedColumns: string[] = ['responsibleProfessorName','subjectName', 'subjectCode', 'roomBlock', 'roomName', 
  'subjectGroup','note', 'actions'];
  listClassesInProgress: classInProgress[] = [];
  
  // Filtro e paginação
  filterClass = '';
  p: number = 1;

  //Comunicação com o componente de criação
  showCreateClass: boolean = false;
  fieldType!: string;

  isAuthenticated: boolean = false //Verifica se o usuário está logado
  disableButtons: boolean = false;
  classInProgressValues: any;
  classInProgressForm: FormGroup;
  listRooms: Room[] = [];
  responsibleProfessorName!: string;
  subjectCode!: string;
  subjectName!: string;
  subjectGroup!: string;

  constructor(
    private formBuilder: FormBuilder,
    private classesServices: ClassesInProgressService,
    private ngxService: NgxUiLoaderService,
    private roomService: RoomService,
    public dialog: MatDialog
  ) { 
    this.classInProgressForm = this.formBuilder.group({
      roomId: [null, Validators.required],
      note: [null],
    });
  }

  ngOnInit() {
    this.getClassesInProgress();
  }

  getClassesInProgress() {
    this.ngxService.start('getClass');
    this.classesServices.getClassesInProgress().subscribe((response: any) => {
    this.ngxService.stop('getClass');
    const statusCode = response['code'];
    switch (statusCode) {
      case 200:
        this.listClassesInProgress = response['content'];
        console.log('response', response);
        break;
    
      default:
        break;
    }
    });
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

  createClassInProgress() {
    this.disableButtons = true;
    this.showCreateClass = true;
    this.fieldType = 'create';
  }

  editClassInProgress(data: any) {
    this.disableButtons = true;
    this.showCreateClass = true;
    this.fieldType = 'edit';
    this.classInProgressValues = data;
    this.getRoom();
    this.responsibleProfessorName = this.classInProgressValues.responsibleProfessorName;
    this.subjectGroup = this.classInProgressValues.subjectGroup;
    this.subjectName = this.classInProgressValues.subjectName;
    this.subjectCode = this.classInProgressValues.subjectCode; 
  }

  deleteClassInProgress(classId: number, values: any) {
    Swal.fire({
      title: 'Tem certeza que gostaria de deletar a reserva de: ' + values.responsibleProfessorName + ' ?',
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
        this.classesServices.deleteClassInProgress(classId).subscribe((response: any) => {
          const statusCode = response['code'];
          switch (statusCode) {
            case 200:
              this.getClassesInProgress();
              Swal.fire(
                'Sucesso!',
                'Aula em andamento excluída!',
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

  cancelCreate() {
    this.disableButtons = false;
    this.classInProgressForm.reset();
  }

  confirmEdit() {
    this.classInProgressForm.value['id'] = this.classInProgressValues.classId;
    if(this.classInProgressForm.valid) {
      Swal.fire({
        title: 'Tem certeza que gostaria de editar a aula de: ' + this.responsibleProfessorName + ' ?',
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
          this.classesServices.editClassInProgress(this.classInProgressForm.value).subscribe((response: any) => {
          const statusCode = response['code'];
          switch (statusCode) {
            case 200:
              this.classInProgressForm.reset();
              this.disableButtons = false;
              this.getClassesInProgress();
              Swal.fire(
                'Sucesso!',
                'Aula em andamento atualizada!',
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

  refreshClassInProgress(value: any) {
    if(value) {
      this.getClassesInProgress();
    }
  }

  getShowCreateFieldValue(value: any) {
    this.disableButtons = value;
    this.showCreateClass = value;
  }

  openModal() {
    const dialogRef = this.dialog.open(CreateEditInProgressComponent, {
    });
}

}
