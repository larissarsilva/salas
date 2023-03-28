import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { ClassesInProgressService } from '../classes-in-progress/classes-in-progress.service';
import { classInProgress, Professors } from '../crud.interface';
import { PdfListCreateComponent } from './pdf-list-create/pdf-list-create.component';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})


export class ScheduleComponent implements OnInit {
  filterClass = '';
  p: number = 1;
  showCreateClass: boolean = false;
  fieldType!: string;
  sendClassValues!: any;

  displayedColumns: string[] = ['professors', 'subjectCode' ,'subject', 'subjectGroup' ,'room', 'day', 'startTime', 'endTime', 'action'];
  ELEMENT_DATA = [];
  listClasses: any;
  selectedFile: any;
  listPDFContent: any;
  
  // Modal de classe
  expandedElement: any;
  columnsToDisplayWithExpand!: string[];
  classInProgressForm: FormGroup;
  listProfessors: Professors[] = [];
  listClassesInProgress: classInProgress[] = [];
  
  //Chegar se a chamada está vindo através do componente de criar aula
  @Input() isClass!: boolean;
  isInProgress: classInProgress | undefined;
  disableButtons: boolean = false;

  constructor(
    private ngxService: NgxUiLoaderService,
    private classesService: ScheduleService,
    private formBuilder: FormBuilder,
    private classesInProgressServices: ClassesInProgressService,
    public dialog: MatDialog
  ) {
    this.classInProgressForm = this.formBuilder.group({
      classId: [null, Validators.required],
      responsibleProfessorId: [null, Validators.required],
      roomId: [null, Validators.required],
      note: [null]
    });
  }


  ngOnInit() {
    this.getClass();
    if(this.isClass == undefined) {
      this.isClass = false;
    } else if (this.isClass == true) {
      this.getClassesInProgress();
      this.displayedColumns.pop();
      this.displayedColumns.splice(8,0,'status');
      this.columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
    }
  }

  getClass() {
    this.ngxService.start('getClasses');
    this.classesService.getClasses().subscribe((response: any) => {
      const statusCode = response['code'];
      this.ngxService.stop('getClasses');
      switch (statusCode) {
        case 200:
          this.listClasses = response['content'];
          this.getClassStatus();
          break;

        default:
          break;
      }
    });
  }

  getClassStatus() {
    for (let index = 0; index <  this.listClasses.length; index++) {
      const element =  this.listClasses[index].id;
      const status = this.listClassesInProgress.findIndex((value: any) => value.classId === element );
      if (status != -1) {
        this.listClasses[index]['status'] = 'OCUPADA';
      } else {
        this.listClasses[index]['status'] = 'LIVRE';
      }
    }
  }

  createClass() {
    this.disableButtons = true;
    this.showCreateClass = true;
    this.fieldType = 'create';
  }

  editClass(data: any) {
    this.disableButtons = true;
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
        this.ngxService.start('deleteClass');
        this.classesService.deleteClass(classId).subscribe((response: any) => {
          this.ngxService.stop('deleteClass');
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
        this.ngxService.start('deleteAlClasses');
        this.classesService.deleteAllClasses().subscribe((response: any) => {
          this.ngxService.stop('deleteAlClasses');
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
    this.disableButtons = false;
    this.showCreateClass = value;
  }

  onFileSelect(event: any) {
    this.ngxService.start('openModal');
    this.selectedFile = event.target.files[0];
    const formdata = new FormData();
    formdata.append('file', this.selectedFile);
    this.classesService.uploadPDF(formdata).subscribe(async (response: any) => {
      const statusCode = response['code'];
      switch (statusCode) {
        case 200:
          this.listPDFContent = await response['content'];
          this.openModal(this.listPDFContent, this.selectedFile.name)
          this.ngxService.stop('openModal');
          break;
      
        default:
          break;
      }
    });
  }

  openModal(pdfContent: any, pdfName: string) {
      const dialogRef = this.dialog.open(PdfListCreateComponent, {
        data: {
          pdfData: pdfContent,
          pdfName: pdfName
        },
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.getClass();
        }
      });
  }

  // Dados do componente modal de aula

  createClassInProgress() {
    if (this.classInProgressForm.valid) { 
      this.classesInProgressServices.createClassInProgress(this.classInProgressForm.value).subscribe((response: any) => {
        const statusCode = response['code'];
        switch (statusCode) {
          case 201:
            this.getClass();
            break;

          default: console.log('validar');
            break;
        }
      });
    }
  }


  //pega os dados da aula e exibe nos inputs
  getClassValues(classValue: any) {
    this.classInProgressForm.controls['classId'].setValue(classValue.id);
    this.classInProgressForm.controls['roomId'].setValue(classValue.room.id);
    this.listProfessors = classValue.professors;
    this.isInProgress = this.listClassesInProgress.find((value: any) => value.classId === classValue.id);
    if(this.isInProgress) {
      this.classInProgressForm.controls['note'].disable();
      this.classInProgressForm.controls['classStatus'].setValue('OCUPADA');
      this.classInProgressForm.controls['note'].setValue(this.isInProgress.note);
      this.classInProgressForm.controls['responsibleProfessorId'].disable();
      this.classInProgressForm.controls['responsibleProfessorId'].setValue(this.isInProgress.responsibleProfessorName);
    } else {
      this.classInProgressForm.controls['note'].setValue('');
      this.classInProgressForm.controls['classStatus'].setValue('LIVRE');
      this.classInProgressForm.controls['note'].enable();
      this.classInProgressForm.controls['responsibleProfessorId'].enable();
      this.classInProgressForm.controls['responsibleProfessorId'].reset();
    }
  }

  getClassesInProgress() {
    this.ngxService.start('getClass');
    this.classesInProgressServices.getClassesInProgress().subscribe((response: any) => {
    this.ngxService.stop('getClass');
    const statusCode = response['code'];
    switch (statusCode) {
      case 200:
        this.listClassesInProgress = response['content'];
        break;
    
      default:
        break;
    }
    });
  }
  
  cancelClassInProgress() {
    this.classInProgressForm.controls['responsibleProfessorId'].reset();
    this.classInProgressForm.controls['note'].reset();
  }
}
