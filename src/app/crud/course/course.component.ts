import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import Swal from 'sweetalert2';
import { CourseService } from './course.service';
import { Course } from '../crud.interface';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CourseComponent implements OnInit {
  filterCourse = '';
  p: number = 1;
  showCreateCourse: boolean = false;
  listCourses: any;

  // Table
  expandedElement: any;
  dataSource: Course[] = [];
  columnsToDisplay = ['name', 'shift'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'actionsDetails'];
  fieldType!: string;
  sendCourse: any;

  constructor(
    private coursesService: CourseService,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.ngxService.start('getCourse');
    this.coursesService.getCourses().subscribe((response: any) => {
      this.ngxService.stop('getCourse');
      const statusCode = response['code'];
      if (statusCode == 200) {
        this.listCourses = response['content'];
        this.dataSource = this.listCourses;
        for (let index = 0; index < this.listCourses.length; index++) {
          const element = this.listCourses[index];
          element['index'] = index;
          if (element['shift'] == 0) {
            element['shift'] = 'MANHÃ'
          } else if (element['shift'] == 1) {
            element['shift'] = 'TARDE'
          } else if (element['shift'] == 2) {
            element['shift'] = 'NOITE'
          }
        }
        this.expandedElement = this.dataSource;
      } else {
        console.log("exibir erro");
      }
    });
  }

  createCourse() {
    this.showCreateCourse = true;
    this.fieldType = 'create';
  }

  getEventValue(value: boolean) {
    this.showCreateCourse = value;
  }

  deleteCourse(id: number, name: string) {
    Swal.fire({
      title: 'Tem certeza que gostaria de deletar o curso:' + name + '?',
      text: "Essa ação não poderá ser desfeita",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngxService.start('deleteCourse');
        this.coursesService.deleteCourse(id).subscribe((response: any) => {
          const statusCode = response['code'];
          this.ngxService.stop('deleteCourse');
          switch (statusCode) {
            case 200:
              this.getCourses();  
              Swal.fire(
              'Sucesso!',
              'Curso excluído',
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

  editCourse(course: any) {
    this.fieldType = 'edit';
    this.sendCourse = course;
    this.showCreateCourse = true;
  }

  refreshGetCourse(value: boolean) {
    if (value) {
      this.getCourses();
    }
  }

}
