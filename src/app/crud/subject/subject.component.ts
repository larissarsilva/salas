import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { SubjectService } from './subject.service';
import { CourseService } from '../course/course.service';
import { SubjectClass } from '../crud.interface';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SubjectComponent implements OnInit {
  p: number = 1;
  filterSubject = '';
  showCreateSubject: boolean = false;
  expandedElement: any;
  listSubject: SubjectClass[] = [];
  columnsToDisplay = ['name', 'code', 'group', 'workload'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'actionsDetails'];
  listSubjects!: SubjectClass[];
  listCourses: any;
  listAllCourses: any;
  fieldType!: string;
  sendSubject: any;
  listSubjectDetails: any;
  disableButtons: boolean = false;
  showErrorCode: any;

  constructor(
    private subjectServices: SubjectService,
    private courseServices: CourseService,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.getSubjects();
    this.listSubjectDetails = [];
  }

  getSubjects() {
    this.ngxService.start('getSubject');
    this.subjectServices.getSubjects().subscribe((response: any) => {
      this.ngxService.stop('getSubject');
      const statusCode = response['code'];
      switch (statusCode) {
        case 200:
          this.listSubject = response.content;
          this.expandedElement = this.listSubject;
          break;

        default: console.log('erro');
          break;
      }
    });
  }

  refreshGetSubjects(value: any) {
    if (value) {
      this.getSubjects();
    }
  }

  createSubject() {
    this.disableButtons = true;
    this.showCreateSubject = true;
    this.fieldType = 'create';
  }


  editSubject(subject: any) {
    this.disableButtons = true;
    this.showCreateSubject = true;
    this.fieldType = 'edit';
    this.sendSubject = subject;
  }

  deleteSubject(subjectId: number, name: string) {
    Swal.fire({
      title: 'Tem certeza que gostaria de deletar a disciplina: ' + name + '?',
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
        this.ngxService.start('deleteSubject');
        this.subjectServices.deleteSubject(subjectId).subscribe((response: any) => {
          const statusCode = response['code'];
          this.ngxService.stop('deleteSubject');
          switch (statusCode) {
            case 200:
              this.getSubjects();
              Swal.fire(
                'Sucesso!',
                'Disciplina excluída!',
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

  getSubjectDetails(subjectId: number) {
    this.ngxService.start('getSubjectDetails');
    this.subjectServices.getSubjectDetails(subjectId).subscribe((response: any) => {
      this.ngxService.stop('getSubjectDetails');
      const statusCode = response['code'];
      switch (statusCode) {
        case 200:
          this.listSubjectDetails = response.content;
          console.log('this.listSubjectDetails', this.listSubjectDetails)
          break;

        default: console.log('erro');
          break;
      }
    });
  }

  getCourseById(subject: any) {
    const coursesId = subject['coursesIds'];
    this.listCourses = [];
    this.courseServices.getCourses().then(response => {
      this.listAllCourses = response;
      for (let index = 0; index < coursesId.length; index++) {
        const subjectId = coursesId[index];
        const hasId = this.listAllCourses.findIndex((value: any) => value.id == subjectId);
        if (hasId != -1) {
          this.listCourses.push(this.listAllCourses[hasId])
        }
      }
    }).catch((error: any) => {
      const errorCode = error.code;
      this.showErrorCode = errorCode;
    }).finally(() => {
      this.ngxService.stop('coursesIds');
    });
  }

  cancelCreate(value: boolean) {
    this.showCreateSubject = value;
    this.disableButtons = value;
  }


}
