import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { classInProgress } from '../crud.interface';
import { ClassesInProgressService } from './classes-in-progress.service';
import { CreateEditInProgressComponent } from './create-edit-in-progress/create-edit-in-progress.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classes-in-progress',
  templateUrl: './classes-in-progress.component.html',
  styleUrls: ['./classes-in-progress.component.css']
})
export class ClassesInProgressComponent implements OnInit {

  // Exibição na tabela
  displayedColumns: string[] = ['responsibleProfessorName','subjectName', 'subjectCode', 'roomName', 'roomBlock', 
  'subjectGroup','note', 'actions'];
  listClassesInProgress: classInProgress[] = [];
  
  // Filtro e paginação
  filterClass = '';
  p: number = 1;

  //Comunicação com o componente de criação
  showCreateClass: boolean = false;
  fieldType!: string;
  sendClassInProgressValues!: any;


  constructor(
    private classesServices: ClassesInProgressService,
    private ngxService: NgxUiLoaderService,
    public dialog: MatDialog
  ) { }

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

  createClassInProgress() {
    this.showCreateClass = true;
    this.fieldType = 'create';
  }

  editClassInProgress(data: any) {
    this.showCreateClass = true;
    this.fieldType = 'edit';
    this.sendClassInProgressValues = data;
  }

  deleteClassInProgress(classId: number, values: any) {
    Swal.fire({
      title: 'Tem certeza que gostaria de deletar a reserva: ' + values.subjectName + ' ?',
      text: "Essa ação não poderá ser desfeita",
      icon: 'warning',
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
              break;
          
            default:
              break;
          }
        });
      }
    });
  }

  refreshClassInProgress(value: any) {
    if(value) {
      this.getClassesInProgress();
    }
  }

  getShowCreateFieldValue(value: any) {
    this.showCreateClass = value;
  }

  openModal() {
    const dialogRef = this.dialog.open(CreateEditInProgressComponent, {
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('resultado', result)
    //   if(result) {
    //     this.getClass();
    //   }
    // });
}

}
