import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { SubjectService } from './subject.service';
import { CourseService } from '../course/course.service';
import { Subject } from '../crud.interface';
import Swal from 'sweetalert2';

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
  listSubject: Subject[] = [];
  columnsToDisplay = ['name', 'code', 'workload', 'group'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'actionsDetails'];
  listSubjects!: Subject[];
  listCourses: any;
  listAllCourses: any;
  fieldType!: string;
  sendSubject: any;

  constructor(
    private subjectServices: SubjectService,
    private courseServices: CourseService
  ) { }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects() {
    this.subjectServices.getSubjects().subscribe((response: any) => {
      const statusCode = response['code'];
      if (statusCode == 200) {
        this.listSubject = response.content;
        this.expandedElement = this.listSubject;
      } else {
        // validação
      }
      // this.listSubjects = response;
    });
  }

  refreshGetSubjects(value: any) {
    if (value) {
      this.getSubjects();
    }
  }

  createSubject() {
    this.showCreateSubject = true;
    this.fieldType = 'create';
  }


  editSubject(subject: any) {
    this.showCreateSubject = true;
    this.fieldType = 'edit';
    this.sendSubject = subject;
  }

  deleteSubject(subjectId: number, name: string) {
    Swal.fire({
      title: 'Tem certeza que gostaria de deletar: ' + name + '?',
      text: "Essa ação não poderá ser desfeita",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subjectServices.deleteSubject(subjectId).subscribe(response => {
          this.getSubjects();
          console.log('result', result)
          Swal.fire(
            'Sucesso!',
            'Disciplina excluída',
            'success'
          )
        });
      }
    });
  }

  getCourseById(subject: any) {
    const coursesId = subject['coursesIds'];
    this.listCourses = [];
    this.courseServices.getCourses().subscribe(response => {
      this.listAllCourses = response;
      for (let index = 0; index < coursesId.length; index++) {
        const subjectId = coursesId[index];
        const hasId = this.listAllCourses.findIndex((value: any) => value.id == subjectId);
        if (hasId != -1) {
          this.listCourses.push(this.listAllCourses[hasId])
        }
      }
    });
  }

  cancelCreate(value: boolean) {
    this.showCreateSubject = value;
  }


}
